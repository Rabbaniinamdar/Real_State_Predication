import sys
import pickle

# Read input data from the command line arguments
age = float(sys.argv[1])
distance = float(sys.argv[2])
num_stores = float(sys.argv[3])

# Load the trained model from the saved file
with open('D:\Backend\ML-Staging\core\model.pkl', 'rb') as file:
    model = pickle.load(file)

# Make a prediction using the trained model
predicted_price = model.predict([[age, distance, num_stores]])

# Return the predicted price as a JSON string
print(predicted_price[0])
