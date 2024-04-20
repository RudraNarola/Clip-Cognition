from flask import Flask, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from flask import request # type: ignore
import requests # type: ignore
import whisper # type: ignore
from moviepy.editor import AudioFileClip # type: ignore
from moviepy.video.VideoClip import ImageClip  # type: ignore
import google.generativeai as genai # type: ignore
from pymongo import MongoClient # type: ignore
import os
import json

app = Flask(__name__)
client = MongoClient('mongodb+srv://lightningthunder2494:IQB9xZiN5l5jCztp@cluster0.havsrie.mongodb.net/')
db = client['test']

CORS(app)




@app.route('/getTranscript', methods=['POST'])
def getTranscript():
    data = request.json
    video_url = data['url']
    title = data['title']
    description = data['description']

    # create video record in database
    createVideo(title, description, video_url)


    filename = "downloaded_video.mp4"
    response = requests.get(video_url)

    if response.status_code == 200:
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Video downloaded successfully as '{filename}'")
    else:
        print("Failed to download the video")


    path = "C:/Users/Admin/OneDrive/Desktop/Clip-Cognition/server/downloaded_video.mp4"
    audio_clip = AudioFileClip(path)
    n = round(audio_clip.duration)
    counter = 0
    start = 0
    audio_clip.close()

    # time interval for each audio clip
    time_interval = 60
    index = time_interval

    flag_to_exit = False
    base_path = "C:/Users/Admin/OneDrive/Desktop/Clip-Cognition/server/allaudio"
    if not os.path.exists(base_path):
            os.mkdir(base_path)
    
    while (True):
        audio_clip = AudioFileClip(path)
        if index >=n:
            flag_to_exit = True
            index = audio_clip.duration
        
        temp = audio_clip.subclip(start, index)
        
        temp_path = base_path + "/temp" + str(counter) + ".mp3"
        temp.write_audiofile(filename=temp_path)
        temp.close()
        counter += 1
        start = index
        index += time_interval
        audio_clip.close()
        if flag_to_exit:
            break


    # convert audio to text
    list_of_audio = os.listdir(base_path)
    final_text = ""
    start = 0
    end = 0
    counter = 0

    model = whisper.load_model("base", device="cpu")

    for index in range(len(list_of_audio)):
        path = os.path.join(base_path, f'temp{index}.mp3')
        result = model.transcribe(path, fp16=False)
        final_text += result['text']
        print("Progress: ", (index+1)/len(list_of_audio)*100, "%")


    print(final_text)

    with open('your_file.txt', 'w',encoding="utf-8", errors='ignore') as textFile:
        textFile.write(final_text)

    makeQuizes(final_text, video_url)

    success_message = {'message': 'Operation was successful'}
    return jsonify(success_message), 200


def makeQuizes(text,video_url):
    # Set up the API key
    genai.configure(api_key="AIzaSyBy6SBMx6wnlwUUsVp0IkcKP_zkIt1BNnU")

    # Set up the model
    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
    }

    # Set up the safety settings
    safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    ]

    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                generation_config=generation_config,
                                safety_settings=safety_settings)

    convo = model.start_chat(history=[])


    text = text + " Generate a quiz of MCQ along with options, answer key & explaination in short using previous structure and store like a json file and there should be a predefined segment number for each question where have you taken quesstion from transcript"
    convo.send_message(text)

    print(convo.last.text)
    textFile = convo.last.text.strip()
    textFile = convo.last.text[8:-5]
    # quizes = json.loads(textFile)
    # print(quizes)
    with open('quiz.json', 'w') as jsonFile:
        jsonFile.write(textFile)
    createQuizes( video_url)

def createVideo(title, description, video_url):
    collection = db['videos']
    result = collection.insert_one(
        {
            "title": title,
            "description": description,
            "video_url": video_url
        }
    )
    print("Video created successfully", result)
    return result


def createQuizes( video_url):
    collection = db['quizes']
    with open('quiz.json') as f:
        quizes = json.load(f)

    result = collection.insert_one({
            "quizes": quizes,
            "video_url": video_url,
            "participants": [],
        })
    print("Quiz created successfully", result)
    return result
    

if __name__ == '__main__':
    app.run(debug=True, port=5000)