Disc golf score calculator:

What This Does:  provides weather-based prediction of scores for league disc golfers 
at three San Francisco Bay Area disc golf courses (Golden Gate Park, Lake Chabot, and 
Berkeley Aquatic Park). 

Why We Did It:  this is a fun way to see how machine learning works.  This project 
makes use of scikit-learn's ElasticNetCV, with a customized way of balancing the 
bias-variance tradeoff.  In particular, because the model is fully interpretable, 
we can directly evaluate the realism of the predicted model parameters and reject 
overfitted solutions.  

Where Is This Deployed?  The user interface is currently deployed on Heroku at 
disc-golf-deep.herokuapp.com.  To use the app, the only requirement is a modern 
browser (tested on Chrome 75 for Windows 10 and Chrome for MacOS) with JavaScript 
enabled.  

The main repo is on GitHub at https://github.com/discgolfpredictiveinsightsteam/Main-Repo 

The repo has two parts, "scoreCalculator" contains all of the code for the deployed app, 
while "models" contains all of the code needed to train and generate the models.  Note 
that the model generation software (mainly Jupyter notebooks) will make a local copy of 
a csv file named "score_model.csv" -- to update the model, this file needs to be 
moved to the "data" directory in "scoreModel" before deploying the app. 

The base score data is provided in a csv file called "scores.csv" in the "data" directory.  
This file is only needed in the event that the sqlite database needs to be re-generated. 
Weather data is provided by Dark Skies through its "time machine" API.  If you wish to 
test this functionality outside of the app, you will need to supply your own API key 
via system environment variables (the variable names can be seen in app.py, we currently 
use two variables supplied with the same API key for future development purposes).  

The "data" directory also contains a set of predicted and actual scores for validation 
purposes. 

The "models" directory contains the workflow for training the models.  Standard processes 
are contained in the "notebooks" folder, including the three latest models, with titles 
indicating their vintage.  Only the latest is needed, but the previous two are available 
for rollback or comparison purposes.  THe folders "eda" and "validate" contains additional  
exploratory and validation work.  

Each notebook contains a self-explanatory introduction that lists its requirements and 
file structure. 

Within the "models" folder, there is a mirror of the "static" folder for the app.  This 
folder is provided as a convenient archive copy for testing purposes.  Because it is 
updated infrequently, it is not guaranteed to be up-to-date with the latest app version. 

Acknowledgements: 

We'd like to thank the Golden Gate, Lake Chabot, and East Bay disc golf leagues for 
sharing their public score data. 



