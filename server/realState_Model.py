# -*- coding: utf-8 -*-
"""
To explain various steps in ML project. We will use "Real estate price prediction" data set . The Kaggle link for the data set

 https://www.kaggle.com/datasets/quantbruce/real-estate-price-prediction

This dataset has 414 sample data . We will create a ML model to predict the price per unit area of a house based on -

1.   Age of the house
2.   Distance from nearest MRT satiation
3.   Number of convenience stores

STEP 1 - Data Collection
We will used python panda library to load data (collected from Kaggle)</font>
"""

import pickle
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn import linear_model
from sklearn import model_selection
import pandas as pd
df = pd.read_csv("D:\Backend\ML-Staging\core\Real_estate.csv")

df.head()

"""
STEP 2 - Data Cleaning 

Logically Columns like -
1.   transaction date
2.   latitude
3.   longitude

Should not have any influence on the outcome (price per unit). Hence, we should remove them </font>
"""

df = df.drop(['No', 'X1 transaction date',
             'X5 latitude', 'X6 longitude'], axis=1)

"""
STEP 3 - Data Preparation

In this step we will select input and result data and create train and test data sample.
In current example we will consider

input x -> age of the house,
distance from nearest MRT satiation,
number of convenience stores</font>
output y ->house price per unit area
"""

x = df.iloc[:, 0:3]
y = df.iloc[:, 3:4]

"""Using Python library for creating train and test split .2 = 80-20% split"""


X_train, X_test, y_train, y_test = model_selection.train_test_split(
    x, y, test_size=0.2, random_state=2)

"""
STEP 4 - Model Selection

Process of fitting the dataset into a standard ML model algorithm . Our current dataset is best fit for Linear Regression algorithm. We will use standard Python sklearn "LinearRegression" ML model algorithm
"""


model = linear_model.LinearRegression()

"""
STEP 5 - Model Training
We will used standard library method to train our model with train data set created in step-3</font>
"""

model.fit(X_train, y_train)

"""
STEP 6 - Model Evaluation
We will used sample test data created in step-3 to evaluate the model performance. Model's standard methods will be used.
"""

y_predict = model.predict(X_test)

"""
Depending on the use-case and type of the model selection various performance matrices will be collected to evaluate the accuracy of the model. (standard libraried will be used)
"""


MAE = mean_absolute_error(y_test, y_predict)
MSE = mean_squared_error(y_test, y_predict)
R2_score = r2_score(y_test, y_predict)
print('MAE -> ', MAE)
print('MSE -> ', MSE)
print('R2 score -> ', R2_score)


"""
STEP 7 - Model deployment

Trained model will be exported. This will be used in web framework to host the model as API
"""


with open('D:\Backend\ML-Staging\core\model.pkl', 'wb') as file:
    pickle.dump(model, file)
    
predicted_price = model.predict([[16, 100, 7]])

print(predicted_price[0])
