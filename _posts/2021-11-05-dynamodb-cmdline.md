---
title: Transferring DynamoDB data between environments
date: 2021-11-05
categories: [AWS, DynamoDB]
tags: [AWS, DynamoDB, Python]
---

> This packaging distribution is published on PyPI, found [here](https://pypi.org/project/dynamo-cmdline/). The source code is hosted on GitHub, found [here](https://github.com/simonryu328/dynamo-cmdline).

## Introduction
Maintaining multiple environments can be hard, especially on a cloud-based data model like Amazon's DynamoDB where cost is dictated by data storage, read and write traffic. When I researched performing a cross-account DynamoDB data copy, I came across over-engineered solutions such as [exporting the table to s3 and using AWS Glue job](https://aws.amazon.com/premiumsupport/knowledge-center/dynamodb-cross-account-migration/) or using [AWS Data Pipeline](https://aws.amazon.com/blogs/database/how-to-migrate-amazon-dynamodb-tables-from-one-aws-account-to-another-with-aws-data-pipeline/) that migrates an entire table. Instead, I wanted to create a simple, light-weight interface for copying tables and subsets of items that can just be run on a terminal. The operations had to be flexible and scalable, as I also wanted to integrate it into CI/CD workflows such as [GitHub Actions](https://github.com/features/actions).

The application starts with an object-oriented approach: I used boto3, the AWS SDK for Python, to wrap a Dynamo table as a class where each instance represents a table in the AWS account. Then, I created a simple CLI with argparse to call class methods such as truncate, copy, restore and query as a high-level interaction with [AWS DynamoDB Client APIs](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html). Item scans and writes were processed in parallel using *multiprocessing* and built-in [batch operations](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html), where any unprocessed items due to insufficient provisioned throughput were retried by implementing an exponential *backoff* algorithm. Finally, the application was distributed as a package and implemented as a GitHub Action Workflow for copying specific data with a click of a button.

Working on this project, I really saw the benefits of building up the application from low-level modules to high-level interface. In addition to using the CLI commands in an automation workflow, I was able to utilize the `DynamodbTable` class in Ad-hoc scripts that quickly resolved production issues which could have taken hours if were done manually.

## What is DynamoDB?
Dynamo is a NoSQL database. A table in Dynamo is defined by its **Partition Key**, which
uniquely identifies a list of records.
The lists are ordered by the **Sort Key**, an optional key that along with Partition Key, form a 
primary key referred to as a *composite primary key*. This gives an additional flexibility when querying data.
Each partition (Partition Key) can be thought of as a filing cabinet drawer, containing a bunch of related records
which may or may not be sorted (Sort Key) depending on your need. Accounting for this optionality, the DynamodbTable class in module `dynamodb_table.py`
can represent tables with either simple (Partition Key) or composite (Partition Key + Sort Key) primary key. This article explains much more about ["the what, why and how of DynamoDB"](https://adamrackis.dev/dynamo-introduction/) in greater detail.

## Dynamo vs. Relational database
Dynamo differs from traditional, relational databases in that tables cannot be queried by random fields.
Because it is structured to guarantee fast and scalable queries, tables also cannot be joined, grouped or unioned.
A specific item can be found by specifiying a partition key and sort key, or a range of values within a partition,
filtered by the sort key. Although filtering by other fields (attributes) is possible,
it is highly discouraged as AWS charges the user based on how much data is read, and non-key filters occur *after*
the reads happen. Querying, and especially copying large amount of data across different AWS environments must be done with extreme care
(double the query operations!), hence this CLI package was distributed.

## GSI (Global Secondary Index)
Since querying is limited to the table's primary key, how can we address many different access patterns? The answer is global secondary indexes, or GSIs. A GSI allows you to essentially re-declare your table with a new key schema. When an item is written into the table, the index will update automatically, so managing dual-writing is not a concern. Most importantly, the GSI can be queried directly just like the natural table, just as fast.

### Libraries Used
- AWS SDK for Python - Boto3
- multiprocessing

## Running the CLI

### Pre-requisite

- Profiles in `.aws/credentials` are configured for AWS environments (accounts).
- Install `dynamo-cmdline` package: ```pip install dynamo-cmdline```

#### Help message
> Displays a help message for using the CLI.


`$ dynamo -h`
```
Command line interface to copy, query and restore DynamoDB tables and items

positional arguments:
  {copy,restore,query}
    copy                Copy table or items from source to target envrionment
    query               Query items in specified environment's table

optional arguments:
  -h, --help            show this help message and exit
```

#### Copy table
> Creates an on-demand target table backup, truncates all items in the target table and copies all source table items in its place.


```$ dynamo copy --table foo --source production --target development```


Copy `foo` table from `production` to `development` environment.


#### Copy items
> Copies queried items from source table to target table. Queries items in source and target table, deletes them from the target table, then copies queried source items to the target table.
> For querying with sort keys, the comparision condition is begins_with.


```
$ dynamo copy --table foo --pk pkexample#id --sk skexample#id --source development --target test
```

Copy queried items in its natural table from development to test environment.


```$ dynamo copy --table foo --pk pkexample#id --index example-index --source prod --target stage```


Copy queried items in the table's secondary index from production to staging environment.

#### Query
> Query items in specified environment's table.

```$ dynamo query --table foo pkexample#id --env dev --head```

Prints the number of items queried as well as the first item returned from the query.

```$ dynamo query --table foo pkexample#id --env dev --unique entity-type```

Prints the number of items queried as well as the unique attribute values of the specified field. Atrribute value must be str.
