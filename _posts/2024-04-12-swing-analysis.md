---
title: Automating Golf Swing Detection and Analysis
date: 2024-04-12
categories: [ML, Computer Vision]
tags: [ML, Computer Vision, RNNs, Python]
---

# Automating Golf Swing Analysis with Computer Vision and Machine Learning

> The source coode for the application is hosted on GitHub, found [here](https://github.com/simonryu328/Golf-Swing-Extractor).

As an avid golfer and machine learning enthusiast, I recently completed yet another(!) project that combines these two passions. I developed an automated system for detecting and analyzing golf swings from video footage, leveraging the power of computer vision and machine learning. This project not only enhanced my technical skills but also provided a practical tool to improve my golf game.

## The Challenge

<figure style="text-align: center;">
  <img src="https://github.com/simonryu328/Golf-Swing-Extractor/blob/master/assets/intro.jpg?raw=true" alt="intro" style="width: 80%; margin: auto;">
</figure>

Every golfer knows the importance of reviewing their swing mechanics. However, manually analyzing hours of driving range footage can be tedious and time-consuming. I set out to create a solution that could automatically detect golf swings within video recordings and extract key information about each swing, making driving range sessions more productive with instant, actionable feedback.

## Technical Approach

The project utilizes a combination of state-of-the-art computer vision techniques and custom machine learning models. Here's a breakdown of the key components:

### 1. Object Detection with Roboflow

I started by using Roboflow's open-source object detection models to track the golf club and club head throughout the video. This step was crucial in isolating the relevant parts of each frame for further analysis. This was achieved using a pre-trained YOLOv5 model that  was fine-tuned on a custom dataset of golf swing videos. Using Roboflow's platform, I was able to extract the xy-coordinates of the club and club head in each frame. Now I had the time series data I needed to analyze the swing mechanics.

<figure style="text-align: center;">
  <img src="https://github.com/simonryu328/Golf-Swing-Extractor/blob/master/plot1.png?raw=true" alt="xy trajectories" style="width: 100%; margin: auto;">
  <figcaption>club and club head trajectories</figcaption>
</figure>

### 2. Time Series Data Preprocessing

After obtaining the object detection results, I developed a pipeline to preprocess the data into time series sequences. This involved:
- Interpolation to handle missing data points
- Normalization to ensure consistent scaling across different videos
- Feature engineering to extract relevant characteristics of the swing

### 3. Machine Learning Models

I experimented with several machine learning architectures to classify swing sequences:

- Logistic Regression: As a baseline model
- Multi-Layer Perceptron (MLP): To capture non-linear relationships
- Long Short-Term Memory (LSTM): To leverage the sequential nature of the data
- Bidirectional LSTM: To consider both past and future context
- Transformer: To capture long-range dependencies in the sequence

After extensive testing, the LSTM model trained on fixed-length time series sequences of golf club and club head trajectories emerged as the best performer.

<figure style="text-align: center;">
  <img src="https://github.com/simonryu328/Golf-Swing-Extractor/blob/master/plot2.png?raw=true" alt="model predictions" style="width: 100%; margin: auto;">
  <figcaption>Positive swing labels detected by the model</figcaption>
</figure>

## Project Structure and Workflow

The project follows a modular structure, with separate components for:

1. Video input and preprocessing
2. Object detection using Roboflow
3. Manual labeling of swing intervals (for training data)
4. Data processing and feature engineering
5. Model training and evaluation
6. Prediction on new videos

I used Jupyter notebooks to document each stage of the project, making it easy to experiment with different approaches and visualize results.

## Challenges and Learnings

Developing this system came with its share of challenges:

1. **Data Variability**: Golf swings can vary significantly between players and even between consecutive swings of the same player. Ensuring the model could generalize well required careful data preprocessing and augmentation.

2. **Sequence Length**: Determining the optimal length of swing sequences to feed into the models was crucial. Too short, and the model might miss important parts of the swing; too long, and it could introduce noise.

3. **Real-time Processing**: Optimizing the system to work in real-time required careful consideration of computational efficiency at each stage of the pipeline.

These challenges provided valuable learning experiences in data preprocessing, model architecture design, and system optimization.

## Future Enhancements

While the current system performs well, there's always room for improvement. Some ideas for future enhancements include:

1. Incorporating more sophisticated biomechanical features into the analysis
2. Expanding the model to classify different types of golf shots (e.g., drive, chip, putt)
3. Developing a mobile app for easy use on the driving range
4. Integrating with wearable sensors for even more precise swing analysis

## Conclusion

This project was a fascinating journey into the intersection of sports and artificial intelligence. It demonstrated the power of combining domain knowledge (in this case, golf) with cutting-edge machine learning techniques to create practical, user-friendly applications.

Beyond the technical aspects, this project reinforced the importance of breaking down complex problems into manageable components and the value of iterative development. Each stage of the project, from data collection to model deployment, offered unique challenges and learning opportunities.

As both my golf game and my machine learning skills continue to improve, I'm excited to further refine this system and explore new applications of AI in sports analysis.