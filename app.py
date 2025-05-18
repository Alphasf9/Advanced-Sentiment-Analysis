from flask import Flask, request, jsonify
from flask_cors import CORS  
import pandas as pd
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer # type: ignore
import nltk # type: ignore

nltk.download('stopwords')

app = Flask(__name__)
CORS(app)

# Load models and data
loaded_word_freq_df = pd.read_csv('word_frequency.csv')
with open('log_prior.txt', 'r') as file:
    loaded_log_prior = float(file.read())

# Preprocess function
def stemming(content):
    stemmed_content = re.sub('[^a-zA-Z]', ' ', content).lower().split()
    final_stopwords = set(stopwords.words('english')) - {'not', 'no', 'against', 'nor'}
    port_stem = PorterStemmer()
    return ' '.join([port_stem.stem(word) for word in stemmed_content if word not in final_stopwords])

# Log likelihood function
def calculate_log_likelihood(stemmed_input):
    words = stemmed_input.split()
    log_likelihood_pos = 0
    log_likelihood_neg = 0
    for word in words:
        if word in loaded_word_freq_df['unique_word'].values:
            lambda_w = loaded_word_freq_df.loc[loaded_word_freq_df['unique_word'] == word, 'lambda_score'].values[0]
            log_likelihood_pos += lambda_w if lambda_w > 0 else 0
            log_likelihood_neg += -lambda_w if lambda_w < 0 else 0
    return log_likelihood_pos, log_likelihood_neg

# Prediction logic
def predict_sentiment(tweet):
    stemmed = stemming(tweet)
    pos, neg = calculate_log_likelihood(stemmed)
    pos += loaded_log_prior
    neg += loaded_log_prior
    return 1 if pos > neg else 0

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    tweet = data.get('tweet', '')
    sentiment = predict_sentiment(tweet)
    return jsonify({
        'tweet': tweet,
        'sentiment': 'Positive' if sentiment == 1 else 'Negative'
    })

if __name__ == '__main__':
    app.run(debug=True)
