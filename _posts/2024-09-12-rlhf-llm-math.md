---
title: Training Large Language Models with RLHF
date: 2024-09-12
categories: [ML, LLMs, RLHF, Math]
tags: [ML, LLMs, RLHF, Math]
---

## Introduction

Reinforcement Learning from Human Feedback (RLHF) has emerged as a powerful technique for fine-tuning Large Language Models (LLMs), enabling them to align more closely with human preferences and produce higher-quality outputs. This blog post delves into the intricacies of RLHF, exploring its methodology, implementation challenges, and the impact it has had on the field of natural language processing.

---

## Understanding RLHF

### What is RLHF?

RLHF is a machine learning technique that combines reinforcement learning with human feedback to train language models. It aims to optimize a model's performance based on human preferences rather than relying solely on predefined objective functions.

### The RLHF Process

1. **Pre-training**: Start with a large language model pre-trained on a vast corpus of text data.
2. **Human Feedback Collection**: Gather human preferences on model outputs.
3. **Reward Modeling**: Train a reward model based on human feedback.
4. **Policy Optimization**: Fine-tune the language model using reinforcement learning with the reward model.

---

## Detailed RLHF Walkthrough

### 1. Pre-training

Before applying RLHF, we start with a pre-trained language model. This model has already learned the basic structure and patterns of language from a large corpus of text data. Popular architectures for this include GPT (Generative Pre-trained Transformer) models or BERT (Bidirectional Encoder Representations from Transformers) variants.

### 2. Human Feedback Collection

The next step involves collecting human feedback on the model's outputs. This typically involves:

- Generating multiple responses to a given prompt using the pre-trained model.
- Presenting these responses to human annotators.
- Asking annotators to rank or rate the responses based on quality, relevance, and other desired criteria.

This process creates a dataset of human preferences, which is crucial for the subsequent steps.

### 3. Reward Modeling

With the human feedback data, we train a reward model. This model learns to predict human preferences for different outputs. The process involves:

1. **Data Preparation**: Convert the human preference data into a format suitable for training. This often involves pairwise comparisons of outputs.

2. **Model Architecture**: Typically, the reward model uses the same architecture as the language model but with a different head that outputs a scalar reward value.

3. **Training Objective**: The reward model is trained to maximize the log likelihood of the human preferences. For a pair of outputs (A, B), if humans preferred A over B, the model should assign a higher reward to A.

4. **Loss Function**: A common choice is the Bradley-Terry model, which models the probability of one item being preferred over another:

   ```
   P(A > B) = exp(r_A) / (exp(r_A) + exp(r_B))
   ```

   where r_A and r_B are the rewards predicted by the model for outputs A and B respectively.

5. **Training Process**: The model is trained using stochastic gradient descent to minimize the negative log likelihood of the observed preferences.

### 4. Policy Optimization

The final step is to fine-tune the language model using reinforcement learning, with the reward model providing the reward signal. This is typically done using Proximal Policy Optimization (PPO), a popular RL algorithm well-suited for this task.

1. **RL Formulation**:
   - State: The current context or prompt.
   - Action: The next token to generate.
   - Reward: Provided by the reward model based on the complete generated sequence.

2. **PPO Algorithm**:
   PPO is an on-policy algorithm that aims to improve the policy (language model) while ensuring that the new policy doesn't deviate too much from the old one. The key steps are:

   a) **Rollout**: Generate sequences using the current policy.
   
   b) **Reward Calculation**: Use the reward model to assign rewards to the generated sequences.
   
   c) **Advantage Estimation**: Calculate the advantage of each action, which represents how much better the action is compared to the average action in that state.
   
   d) **Policy Update**: Update the policy to maximize the objective:

      ```
      L = E[min(r_t(θ)A_t, clip(r_t(θ), 1-ε, 1+ε)A_t)]
      ```

      where r_t(θ) is the probability ratio of the new policy to the old policy, A_t is the advantage, and ε is a hyperparameter that controls how much the policy can change.

   e) **Value Function Update**: Train a value function to predict the expected return, which helps in calculating the advantage in future iterations.

3. **KL Divergence Constraint**: To prevent the model from deviating too far from its initial language modeling capabilities, a KL divergence term is often added to the objective:

   ```
   L_final = L_PPO - β * KL(π_new || π_initial)
   ```

   where β is a hyperparameter controlling the strength of the constraint.

4. **Iterative Process**: Steps 1-3 are repeated for multiple iterations, gradually improving the model's ability to generate preferred outputs.

--- 

## Challenges and Considerations
There are several challenges and considerations to keep in mind when applying RLHF. These include:

1. **Reward Hacking**: The model might find ways to maximize the reward that don't align with true human preferences. Careful reward modeling and constrained optimization are crucial.

2. **Diversity Preservation**: RLHF can sometimes lead to reduced output diversity. Techniques like entropy regularization can help maintain diversity.

3. **Scalability**: Collecting high-quality human feedback at scale can be challenging and expensive.

4. **Bias**: The human feedback process can introduce or amplify biases present in the annotator pool.

5. **Reward Modeling Accuracy**: The effectiveness of RLHF heavily depends on the quality of the reward model.

6. **Computational Cost**: RLHF, especially the policy optimization phase, can be computationally expensive.

---

## Advanced RLHF Techniques
Researchers and practitioners are continously developing increasingly sophisticated RLHF techniques. These techniques aim to address limitations of basic RLHF and create more versatile, efficient, and powerful language models:

### Multi-task RLHF

Instead of optimizing for a single objective, multi-task RLHF involves training the model to perform well across multiple tasks or criteria simultaneously. This can lead to more versatile and robust models.

### Recursive Reward Modeling

This involves using the trained model itself to assist in generating higher-quality reward models, creating a feedback loop that can potentially lead to continuous improvement.

### Inverse Reinforcement Learning (IRL) in RLHF

IRL techniques can be used to infer the underlying reward function from human demonstrations, potentially leading to more nuanced and accurate reward modeling.

### Meta-learning for RLHF

Applying meta-learning techniques to RLHF can help models adapt more quickly to new preferences or tasks with minimal additional training.

---

## Example: Correcting Reasoning Errors in Math Problems

As part of my work in training Large Language Models (LLMs), I've had the opportunity to develop and implement RLHF techniques to improve their mathematical reasoning. I'd like to share one of the specific tasks I worked on, which demonstrates how we can use RLHF to address reasoning errors in tricky math problems.

### The Challenge: Crafting a Tricky Function Transformation Problem

One of my goals was to create a math problem that could potentially trick the model into making a reasoning error. The key was to ensure that the error would arise from incorrect reasoning rather than calculation mistakes or sub-optimal approaches. Here's the prompt I crafted using high school function transformation problems:

> The function $f(x)=x^2$ is transformed to become $f(x)=0.25x^2$. Which of the following statements are correct about the transformation?
> 
> A. $f(x)$ has been vertically compressed. \
> B. $f(x)$ has been vertically stretched. \
> C. $f(x)$ has been horizontally compressed. \
> D. $f(x)$ has been horizontally stretched.

What do you think is the correct answer? In my opinion, these high school function transformation problems are often misleading, and I wanted to see how the model would handle it. My solution may be up for debates, but it does show that function transformations can be confusing even for large language models, as it was able to stump the model.
<details>
  <summary>Answer</summary>
  <b> both A and D are correct. </b> Why? The function is multiplied by 0.25, which is less than 1, making all y-values smaller and "squishing" the graph vertically. This explains the vertical compression. At the same time, we can rewrite 0.25x^2 as (x/2)^2, which means x is divided by 2 before being squared. As a result, x needs to be twice as big to get the same y-value as before, stretching the graph horizontally and making it wider.
</details>
### The RLHF Technique: Iterative Refinement with Explanations (IRE)

To address the reasoning errors that emerged from this problem, I applied a specific RLHF technique that I call "Iterative Refinement with Explanations" (IRE). Here's how it worked:

1. **Initial Response Generation**: I had the model generate its initial response to the math problem.

2. **Human Feedback Collection**: 
   - As an expert, I reviewed the model's response and provided detailed feedback.
   - I evaluated each step of the reasoning process, marking steps as correct or incorrect.
   - For incorrect steps, I provided rewrite suggestions.

3. **Iterative Refinement**:
   - The model incorporated my feedback and generated a new response.
   - I repeated this process until the model consistently produced correct answers with sound reasoning.

Let me walk you through how this process unfolded for our function transformation problem.

#### Turn 1: Initial Model Response

Here's the initial response generated by the LLM, step by step:

1. To determine the type of transformation applied to the function $f(x) = x^2$ when it becomes $f(x) = 0.25x^2$, we need to compare the two functions and analyze the changes in their coefficients.
2. The original function is $f(x) = x^2$. The transformed function is $f(x) = 0.25x^2$. We can rewrite $0.25$ as $\frac{1}{4}$ to better understand the transformation.
3. By comparing the coefficients of $x^2$ in both functions, we see that the coefficient in the transformed function ($\frac{1}{4}$) is less than $1$. This indicates a reduction or "compression" in the vertical direction.
4. To confirm, we can analyze how the transformation affects the output values of the function. For any given input $x$, the output of the transformed function $f(x) = 0.25x^2$ will be one-fourth of the output of the original function $f(x) = x^2$. This reduction in output values further supports the conclusion that a vertical compression has occurred.
5. Considering the horizontal direction, if a function $f(x) = x^2$ were to be horizontally compressed or stretched, it would involve a change within the function's input, such as $f(x) = (kx)^2$, where $k$ is a constant that determines the type and extent of the horizontal transformation. However, the transformation provided only involves a change in the coefficient of $x^2$, without altering the input $x$ itself. Therefore, there is no horizontal compression or stretch in this case.
6. Based on the analysis, the correct statement about the transformation of $f(x)$ is that it has been vertically compressed.

**Answer: A. $f(x)$ has been vertically compressed.**

#### My Feedback

As I reviewed the model's response, I provided the following feedback:

1. Correct
2. Correct
3. Correct
4. Correct
5. Incorrect - I noted that the response unreasonably assumes that the transformation provided only involves a change in the output of the function such as $f(x)=kx^2$, when it can also be written as $f(x)=(kx)^2$. 
   
   I suggested the following rewrite: *"Considering the horizontal direction, if a function $f(x) = x^2$ were to be horizontally compressed or stretched, it would involve a change within the function's input, such as $f(x) = (kx)^2$, where $k$ is a constant that determines the type and extent of the horizontal transformation. While $f(x)=0.25x^2=\frac{1}{4}x^2$ may appear to only involve multiplying the output of the original function, it can also be rewritten as $f(x)=(\frac{x}{2})^2$. In this form, the input $x$ is multiplied by $\frac{1}{2}$ before squaring, indicating a "stretch" in the horizontal direction."*

5. Incorrect due to the error in step 4.

#### Turn 2: Refined Model Response

After incorporating my feedback, the model generated a new response:

1. To determine the type of transformation applied to the function $f(x) = x^2$ when it becomes $f(x) = 0.25x^2$, we need to compare the two functions and analyze the changes in their coefficients.
2. The original function is $f(x) = x^2$. The transformed function is $f(x) = 0.25x^2$. We can rewrite $0.25$ as $\frac{1}{4}$ to better understand the transformation.
3. By comparing the coefficients of $x^2$ in both functions, we see that the coefficient in the transformed function ($\frac{1}{4}$) is less than $1$. This indicates a reduction or "compression" in the vertical direction.
4. To confirm, we can analyze how the transformation affects the output values of the function. For any given input $x$, the output of the transformed function $f(x) = 0.25x^2$ will be one-fourth of the output of the original function $f(x) = x^2$. This reduction in output values further supports the conclusion that a vertical compression has occurred.
5. Considering the horizontal direction, if a function $f(x) = x^2$ were to be horizontally compressed or stretched, it would involve a change within the function's input, such as $f(x) = (kx)^2$, where $k$ is a constant that determines the type and extent of the horizontal transformation. While $f(x)=0.25x^2=\frac{1}{4}x^2$ may appear to only involve multiplying the output of the original function, it can also be rewritten as $f(x)=(\frac{x}{2})^2$. In this form, the input $x$ is multiplied by $\frac{1}{2}$ before squaring, indicating a "stretch" in the horizontal direction.
6. Since the input $x$ is multiplied by $\frac{1}{2}$ (a value less than $1$) in the expression $f(x)=(\frac{x}{2})^2$, this indicates that the horizontal transformation is a stretch rather than a compression. If the input were multiplied by a value greater than $1$, it would indicate a compression.
7. Given these observations, we can conclude that the transformation from $f(x) = x^2$ to $f(x) = 0.25x^2$ involves both a vertical compression (since the output values are reduced) and a horizontal stretch (since the input values are scaled by a factor less than $1$).
8. Based on the analysis, the correct statements about the transformation are A ($f(x)$ has been vertically compressed) and D ($f(x)$ has been horizontally stretched).

**Answer: A. $f(x)$ has been vertically compressed. D. $f(x)$ has been horizontally stretched.**

### The Impact of IRE

Through this iterative refinement process, I observed several key improvements in the model's mathematical reasoning:

1. **Error Correction**: The model learned to identify and correct the specific type of reasoning error I had designed the problem to reveal - overlooking alternative representations of functions.

2. **Step-by-Step Reasoning**: My feedback encouraged the model to provide clearer, step-by-step explanations, making its thought process more transparent and easier to evaluate.

3. **Concept Integration**: Through the feedback, the model learned to better integrate related concepts, such as the relationship between coefficient changes and horizontal transformations, into its reasoning.

4. **Adaptability**: The model demonstrated the ability to incorporate new information and adjust its conclusions accordingly.

5. **Comprehensive Analysis**: The refined response showed a more thorough analysis of all aspects of the problem, including evaluation of all given options.

This experience with the function transformation problem is just one example of the many tasks I've worked on to improve LLMs' mathematical reasoning abilities. By applying this RLHF technique across a wide range of mathematical problems, we're developing language models that not only provide correct answers but also demonstrate human-like mathematical reasoning and clear explanations.

---
## Conclusion

Reinforcement Learning from Human Feedback represents a significant advancement in aligning AI systems with human values and preferences. As we continue to develop more powerful language models, RLHF will play a crucial role in ensuring these models are not only capable but also beneficial and aligned with human intent. For software engineers and researchers in the field, understanding and improving RLHF techniques will be key to shaping the future of AI.
