from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder=".")

@app.route("/api/hello")
def hello():
    return jsonify({"message": "Hello from Flask on Render!"})

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
