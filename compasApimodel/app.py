import numpy as np
import os
from flask import Flask, request, render_template, jsonify
import pickle
from flask_cors import CORS
import json
import pandas as pd
# import streamlit
# Create flask app
app = Flask(__name__)
CORS(app)
# Get the absolute path to the model file
script_directory = os.path.dirname(os.path.abspath(__file__))
model_file_path = os.path.join(script_directory, "model2.pkl")
# Load the model
model = pickle.load(open(model_file_path, "rb"))


def get_age_category(age):
    if age < 25:
        return "Less than 25"
    elif age >= 25 and age <= 45:
        return "25 - 45"
    else:
        return "Greater than 45"


@app.route("/")
def Home():
    return "recidApi"

@app.route("/predictApi", methods=["POST"])
def predictApi():
    try:
        # Log incoming request data
        app.logger.info("Received request data:\n\n\n\n %s", request.data)

        # Parse JSON data
        request_data = json.loads(request.data)

        age = int(request_data["age"])
        priors_count = int(request_data["priors_count"])
        v_decile_score = int(request_data["v_decile_score"])
        decile_score = int(request_data["decile_score"])
        length_of_stay = int(request_data["length_of_stay"])

        c_charge_degree = request_data["c_charge_degree"]
        race = request_data["race"]
        age_cat = get_age_category(age)
        sex = request_data["sex"]

        c_charge_degree_enc = {"F": 0, "M": 1}
        race_enc = {
            "African-American": 0,
            "Asian": 1,
            "Caucasian": 2,
            "Hispanic": 3,
            "Native American": 4,
            "Other": 5,
        }
        age_cat_enc = {
            "25 - 45": 0,
            "Greater than 45": 1,
            "Less than 25": 2,
        }
        sex_enc = {"Female": 0, "Male": 1}

        c_charge_degree_enc_val = c_charge_degree_enc.get(c_charge_degree)
        race_enc_val = race_enc.get(race)
        age_cat_enc_val = age_cat_enc.get(age_cat)
        sex_enc_val= sex_enc.get(sex)
# 
        features = np.array(
            [
                [
                    age,
                    priors_count,
                    v_decile_score,
                    decile_score,
                    length_of_stay,
                    c_charge_degree_enc_val,
                    race_enc_val,
                    age_cat_enc_val,
                    sex_enc_val,
                ]
            ]
        )
        app.logger.info("Features: %s", features)
        # feature_names = ["age", "c_charge_degree", "race", "age_cat", "sex", "priors_count", "v_decile_score", "decile_score", "length_of_stay"]

# Create DataFrame
        # features_df = pd.DataFrame(features, columns=feature_names)
        
        # prediction = model.predict_proba(features_df)

        # prediction_json = prediction.tolist()
        
        prediction = model.predict(features)
        
        predicitonlist = prediction.tolist()
        #return jsonify(prediction)
        return predicitonlist
        #return jsonify(predicitonlist)
    

    except (KeyError, ValueError, IndexError) as e:
        # Log error and return error message
        app.logger.error("Error processing request: %s", e)
        error_message = "Please provide valid input for all fields"
        return jsonify({
            "error_message": error_message,
            "request_form_data": request.form,
            "error": str(e)
        }), 400 

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         # Get integer inputs
#         age = int(request.form["age"])
#         priors_count = int(request.form["priors_count"])
#         v_decile_score = int(request.form["v_decile_score"])
#         decile_score = int(request.form["decile_score"])
#         length_of_stay = int(request.form["length_of_stay"])

#         # Process categorical inputs
#         c_charge_degree = request.form["c_charge_degree"]
#         race = request.form["race"]
#         age_cat = get_age_category(age)
#         sex = request.form["sex"]

#         # Map categorical inputs to encoded values based on model's expectations
#         c_charge_degree_enc = {"F": 0, "M": 1}  # Example encoding, adjust as needed
#         race_enc = {
#             "African-American": 0,
#             "Asian": 1,
#             "Caucasian": 2,
#             "Hispanic": 3,
#             "Native American": 4,
#             "Other": 5,
#         }  # Example encoding, adjust as needed
#         age_cat_enc = {
#             "25 - 45": 0,
#             "Greater than 45": 1,
#             "Less than 25": 2,
#         }  # Example encoding, adjust as needed
#         sex_enc = {"Female": 0, "Male": 1}  # Example encoding, adjust as needed

#         # Convert categorical inputs to encoded values
#         c_charge_degree_enc_val = c_charge_degree_enc[c_charge_degree]
#         race_enc_val = race_enc[race]
#         age_cat_enc_val = age_cat_enc[age_cat]
#         sex_enc_val = sex_enc[sex]

#         # Prepare the input features for prediction
#         features = np.array(
#             [
#                 [
#                     age,
#                     priors_count,
#                     v_decile_score,
#                     decile_score,
#                     length_of_stay,
#                     c_charge_degree_enc_val,
#                     race_enc_val,
#                     age_cat_enc_val,
#                     sex_enc_val,
#                 ]
#             ]
#         )

#         # Make prediction using the model
#         prediction = model.predict(features)

#         # Format the prediction result
#         prediction_text = f"The predicted outcome is: {prediction}"

#         return render_template("index.html", prediction_text=prediction_text)

#     except (KeyError, ValueError, IndexError) as e:
#         # Handle missing or invalid inputs
#         error_message = "Please provide valid input for all fields."
#         return render_template("index.html", prediction_text=error_message)


if __name__ == "__main__":
    app.run(debug=True)
