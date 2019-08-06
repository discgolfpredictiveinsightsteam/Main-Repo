import requests
import json 
import pandas as pd
import os

def get_weather_data(course, date):
    """Return weather prediction"""
    course = int(course)
    course_info_df = pd.read_csv('static/data/course_data.csv')
    course_lat = course_info_df.loc[course_info_df.course == course,'lat'].values[0]
    course_lon = course_info_df.loc[course_info_df.course == course,'lon'].values[0]
    # First get the forecast -- API recall returns entire day's worth of data
    API_Key = os.environ['CYAN_KEY']
    base_url = 'https://api.darksky.net/forecast/'
    course_lat = str(course_lat)
    course_lon = str(course_lon) 
    url = base_url + API_Key + '/' + course_lat + ',' + course_lon + ',' + date + 'T12:00:00?exclude=current,flags'
    # Forecast will be a list of dictionaries 
    forecast = requests.get(url).json()
    return forecast 

if __name__ == '__main__':
    fcast_date = input('Enter a forecast date in YYYY-MM-DD format')
    course_forecasts = [get_weather_data(ix,fcast_date) for ix in range(3)]
    for ix, course_forecast in enumerate(course_forecasts):
        outfile = 'wx_record/forecast_archive/forecast_' + str(ix) + '_' + fcast_date + '.txt'
        with open(outfile, 'w') as dump_loc:
            json.dump(course_forecast, dump_loc)
