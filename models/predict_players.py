import os
import numpy as np
import pandas as pd
import datetime as dt
import pytz 
import json 

def is_dst_USPacific(date):
    """Check whether Daylight Savings Time is in effect in the US Pacific timezone 
    for given date in YYYY-MM-DD format, using 5 AM as a test time (do not use for times before 3 AM)"""
    game_date = dt.date.fromisoformat(date)
    dst_test_time = dt.datetime.combine(game_date, dt.time.fromisoformat('05:00:00'))
    # Localize time to US Pacific and compute numbers of hours it is offset from UTC.  If 7, then DST is in effect.
    dst_in_effect = False
    check_UTC_offset = (pytz.timezone('US/Pacific').localize(dst_test_time).utcoffset().seconds / 3600 - 24) * -1
    if check_UTC_offset == 7.0:
        dst_in_effect = True
    return dst_in_effect

if __name__ == '__main__':

    forecast = {"latitude": 37.7706515, "longitude": -122.49096909999999, "timezone": "America/Los_Angeles", "currently": {"time": 1564945200, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 60.24, "apparentTemperature": 60.24, "dewPoint": 56.56, "humidity": 0.88, "pressure": 1015.06, "windSpeed": 8.7, "windGust": 9.67, "windBearing": 234, "cloudCover": 0.85, "uvIndex": 5, "visibility": 7.471, "ozone": 309.9}, "hourly": {"summary": "Mostly cloudy throughout the day.", "icon": "partly-cloudy-day", "data": [{"time": 1564902000, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0, "precipProbability": 0, "temperature": 58.07, "apparentTemperature": 58.07, "dewPoint": 56.51, "humidity": 0.95, "pressure": 1014.38, "windSpeed": 7.8, "windGust": 10.1, "windBearing": 247, "cloudCover": 0.81, "uvIndex": 0, "visibility": 4.74, "ozone": 311.1}, {"time": 1564905600, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0, "precipProbability": 0, "temperature": 57.94, "apparentTemperature": 57.94, "dewPoint": 56.56, "humidity": 0.95, "pressure": 1014.18, "windSpeed": 8.1, "windGust": 10.6, "windBearing": 234, "cloudCover": 0.71, "uvIndex": 0, "visibility": 4.943, "ozone": 310.4}, {"time": 1564909200, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0.0015, "precipProbability": 0.01, "precipType": "rain", "temperature": 57.88, "apparentTemperature": 57.88, "dewPoint": 56.51, "humidity": 0.95, "pressure": 1013.79, "windSpeed": 8.34, "windGust": 11.26, "windBearing": 231, "cloudCover": 0.65, "uvIndex": 0, "visibility": 5.099, "ozone": 310.4}, {"time": 1564912800, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0.0008, "precipProbability": 0.01, "precipType": "rain", "temperature": 57.66, "apparentTemperature": 57.66, "dewPoint": 56.39, "humidity": 0.96, "pressure": 1013.64, "windSpeed": 8.3, "windGust": 11.34, "windBearing": 231, "cloudCover": 0.66, "uvIndex": 0, "visibility": 5.083, "ozone": 311.5}, {"time": 1564916400, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0.0023, "precipProbability": 0.01, "precipType": "rain", "temperature": 57.33, "apparentTemperature": 57.33, "dewPoint": 56.31, "humidity": 0.96, "pressure": 1013.55, "windSpeed": 8.25, "windGust": 11.42, "windBearing": 233, "cloudCover": 0.68, "uvIndex": 0, "visibility": 5.067, "ozone": 313}, {"time": 1564920000, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0.0013, "precipProbability": 0.01, "precipType": "rain", "temperature": 56.92, "apparentTemperature": 56.92, "dewPoint": 56.21, "humidity": 0.97, "pressure": 1013.61, "windSpeed": 8.18, "windGust": 11.41, "windBearing": 233, "cloudCover": 0.69, "uvIndex": 0, "visibility": 5.073, "ozone": 313.8}, {"time": 1564923600, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0.0032, "precipProbability": 0.01, "precipType": "rain", "temperature": 56.53, "apparentTemperature": 56.53, "dewPoint": 56.13, "humidity": 0.99, "pressure": 1013.83, "windSpeed": 8.01, "windGust": 11.29, "windBearing": 233, "cloudCover": 0.74, "uvIndex": 0, "visibility": 5.218, "ozone": 313.2}, {"time": 1564927200, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0.0017, "precipProbability": 0.01, "precipType": "rain", "temperature": 56.24, "apparentTemperature": 56.24, "dewPoint": 56.1, "humidity": 1, "pressure": 1014.04, "windSpeed": 7.91, "windGust": 10.94, "windBearing": 233, "cloudCover": 0.79, "uvIndex": 0, "visibility": 5.402, "ozone": 311.9}, {"time": 1564930800, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0.0015, "precipProbability": 0.01, "precipType": "rain", "temperature": 56.37, "apparentTemperature": 56.37, "dewPoint": 56.11, "humidity": 0.99, "pressure": 1014.32, "windSpeed": 7.75, "windGust": 10.53, "windBearing": 233, "cloudCover": 0.81, "uvIndex": 1, "visibility": 5.428, "ozone": 310.7}, {"time": 1564934400, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0.001, "precipProbability": 0.01, "precipType": "rain", "temperature": 56.96, "apparentTemperature": 56.96, "dewPoint": 56.23, "humidity": 0.97, "pressure": 1014.66, "windSpeed": 7.79, "windGust": 10.17, "windBearing": 231, "cloudCover": 0.81, "uvIndex": 2, "visibility": 5.513, "ozone": 310.2}, {"time": 1564938000, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0.0002, "precipProbability": 0.01, "precipType": "rain", "temperature": 57.84, "apparentTemperature": 57.84, "dewPoint": 56.4, "humidity": 0.95, "pressure": 1015.01, "windSpeed": 7.89, "windGust": 9.99, "windBearing": 229, "cloudCover": 0.8, "uvIndex": 3, "visibility": 5.559, "ozone": 310}, {"time": 1564941600, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 58.8, "apparentTemperature": 58.8, "dewPoint": 56.49, "humidity": 0.92, "pressure": 1015.16, "windSpeed": 8.41, "windGust": 10.46, "windBearing": 231, "cloudCover": 0.78, "uvIndex": 4, "visibility": 5.6, "ozone": 309.8}, {"time": 1564945200, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 60.24, "apparentTemperature": 60.24, "dewPoint": 56.56, "humidity": 0.88, "pressure": 1015.06, "windSpeed": 8.7, "windGust": 9.67, "windBearing": 234, "cloudCover": 0.85, "uvIndex": 5, "visibility": 7.471, "ozone": 309.9}, {"time": 1564948800, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 61.54, "apparentTemperature": 61.54, "dewPoint": 56.67, "humidity": 0.84, "pressure": 1015.02, "windSpeed": 9.85, "windGust": 10.9, "windBearing": 240, "cloudCover": 0.74, "uvIndex": 6, "visibility": 6.139, "ozone": 310.1}, {"time": 1564952400, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 62.74, "apparentTemperature": 62.74, "dewPoint": 56.76, "humidity": 0.81, "pressure": 1014.88, "windSpeed": 10.8, "windGust": 12.25, "windBearing": 245, "cloudCover": 0.65, "uvIndex": 6, "visibility": 5.671, "ozone": 309.8}, {"time": 1564956000, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 63.4, "apparentTemperature": 63.4, "dewPoint": 56.79, "humidity": 0.79, "pressure": 1014.59, "windSpeed": 11.39, "windGust": 13.8, "windBearing": 250, "cloudCover": 0.61, "uvIndex": 6, "visibility": 6.9, "ozone": 308.7}, {"time": 1564959600, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 63.69, "apparentTemperature": 63.69, "dewPoint": 56.8, "humidity": 0.78, "pressure": 1014.19, "windSpeed": 11.76, "windGust": 15.43, "windBearing": 255, "cloudCover": 0.59, "uvIndex": 4, "visibility": 9.082, "ozone": 307.1}, {"time": 1564963200, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 63.21, "apparentTemperature": 63.21, "dewPoint": 56.79, "humidity": 0.8, "pressure": 1013.94, "windSpeed": 11.79, "windGust": 16.49, "windBearing": 258, "cloudCover": 0.57, "uvIndex": 3, "visibility": 10, "ozone": 305.7}, {"time": 1564966800, "summary": "Mostly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 62.19, "apparentTemperature": 62.19, "dewPoint": 56.76, "humidity": 0.82, "pressure": 1013.88, "windSpeed": 11.44, "windGust": 16.62, "windBearing": 260, "cloudCover": 0.53, "uvIndex": 1, "visibility": 10, "ozone": 304.9}, {"time": 1564970400, "summary": "Partly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 60.76, "apparentTemperature": 60.76, "dewPoint": 56.69, "humidity": 0.86, "pressure": 1013.95, "windSpeed": 10.8, "windGust": 16.16, "windBearing": 259, "cloudCover": 0.47, "uvIndex": 0, "visibility": 10, "ozone": 304.3}, {"time": 1564974000, "summary": "Partly Cloudy", "icon": "partly-cloudy-day", "precipIntensity": 0, "precipProbability": 0, "temperature": 59.56, "apparentTemperature": 59.56, "dewPoint": 56.62, "humidity": 0.9, "pressure": 1014.05, "windSpeed": 10.13, "windGust": 15.41, "windBearing": 257, "cloudCover": 0.46, "uvIndex": 0, "visibility": 10, "ozone": 303.4}, {"time": 1564977600, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0, "precipProbability": 0, "temperature": 58.68, "apparentTemperature": 58.68, "dewPoint": 56.54, "humidity": 0.93, "pressure": 1014.21, "windSpeed": 9.49, "windGust": 14.19, "windBearing": 256, "cloudCover": 0.51, "uvIndex": 0, "visibility": 10, "ozone": 302.2}, {"time": 1564981200, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0, "precipProbability": 0, "temperature": 58.01, "apparentTemperature": 58.01, "dewPoint": 56.46, "humidity": 0.95, "pressure": 1014.38, "windSpeed": 8.85, "windGust": 12.61, "windBearing": 254, "cloudCover": 0.61, "uvIndex": 0, "visibility": 9.915, "ozone": 300.7}, {"time": 1564984800, "summary": "Mostly Cloudy", "icon": "partly-cloudy-night", "precipIntensity": 0, "precipProbability": 0, "temperature": 57.76, "apparentTemperature": 57.76, "dewPoint": 56.36, "humidity": 0.95, "pressure": 1014.51, "windSpeed": 8.3, "windGust": 11.35, "windBearing": 253, "cloudCover": 0.71, "uvIndex": 0, "visibility": 9.077, "ozone": 299.4}]}, "daily": {"data": [{"time": 1564902000, "summary": "Partly cloudy throughout the day.", "icon": "partly-cloudy-day", "sunriseTime": 1564924646, "sunsetTime": 1564975036, "moonPhase": 0.16, "precipIntensity": 0.0007, "precipIntensityMax": 0.0032, "precipIntensityMaxError": 0.057, "precipIntensityMaxTime": 1564923600, "precipProbability": 0.06, "precipType": "rain", "temperatureHigh": 63.69, "temperatureHighError": 4.26, "temperatureHighTime": 1564959600, "temperatureLow": 56.4, "temperatureLowError": 4.26, "temperatureLowTime": 1565013600, "apparentTemperatureHigh": 63.69, "apparentTemperatureHighTime": 1564959600, "apparentTemperatureLow": 56.4, "apparentTemperatureLowTime": 1565013600, "dewPoint": 56.48, "humidity": 0.91, "pressure": 1014.29, "windSpeed": 9.12, "windGust": 16.62, "windGustTime": 1564966800, "windBearing": 244, "cloudCover": 0.68, "uvIndex": 6, "uvIndexTime": 1564952400, "visibility": 7.019, "ozone": 308, "temperatureMin": 56.24, "temperatureMinError": 4.26, "temperatureMinTime": 1564927200, "temperatureMax": 63.69, "temperatureMaxError": 4.26, "temperatureMaxTime": 1564959600, "apparentTemperatureMin": 56.24, "apparentTemperatureMinTime": 1564927200, "apparentTemperatureMax": 63.69, "apparentTemperatureMaxTime": 1564959600}]}, "offset": -7}
    
    course_info_df = pd.read_csv('geo/course_data.csv')
    course = 0

    # To decode the dictionaries, we need the UTC timestamp for midnight on the date
    # Note that both Dark Skies and Python use timezone-unaware indexing 
    time_offset = dt.datetime.fromisoformat('2019-08-04').timestamp()
    # Search for hours 6 to 21 (6AM to 9PM) using timestamp as key
    start_time = int(time_offset + 3600 * 6)
    end_time = int(time_offset + 3600 * 22)

    times_list = [tstamp for tstamp in range(start_time, end_time, 3600)]
    # Retrieve weights to go with each time 
    if is_dst_USPacific('2019-08-04'):
        weights_list = course_info_df.loc[(course_info_df.course == course) & \
            ((course_info_df.dst == 'yes') | (course_info_df.dst == 'all'))].values[0][4:]
    else:
            weights_list = course_info_df.loc[(course_info_df.course == course) & \
            ((course_info_df.dst == 'yes') | (course_info_df.dst == 'all'))].values[0][4:]      
    # Retrieve weather data to go with each time
    # First create lists with default "missing" values (-99)
    temperature_list = [-99 for _ in range(16)]
    wind_speed_list = [-99 for _ in range(16)]
    wind_gust_list = [-99 for _ in range(16)]
    wind_dir_list = [-99 for _ in range(16)]
    precip_list = [-99 for _ in range(16)]
    # Now work through the forecast data, adding info at the right places if found
    for wx_dict in forecast['hourly']['data']:
        try:
            hour_of_day = int((int(wx_dict['time']) - time_offset)/ 3600)
            if (hour_of_day < 6) or (hour_of_day) > 21:
                continue   #Skip this wx_dict if an invalid hour is found
        except (ValueError, KeyError):
                continue   #Skip this wx_dict if the time is not a number or not present
        try:
            forecast_temperature = float(wx_dict['temperature'])
        except (ValueError, KeyError):
            forecast_temperature = -99
        try:
            forecast_wind_speed = float(wx_dict['windSpeed'])
        except (ValueError, KeyError):
            forecast_wind_speed = -99       
        try:
            forecast_wind_gust = float(wx_dict['windGust'])
        except (ValueError, KeyError):
            forecast_wind_gust = -99
        try:
            forecast_wind_dir = float(wx_dict['windBearing'])
        except (ValueError, KeyError):
            forecast_wind_dir = -99      
        try:
            forecast_precip = float(wx_dict['precipIntensity'])
        except (ValueError, KeyError):
            forecast_precip = -99
        wx_data_index = hour_of_day - 6
        temperature_list[wx_data_index] = forecast_temperature
        wind_speed_list[wx_data_index] = forecast_wind_speed
        wind_gust_list[wx_data_index] = forecast_wind_gust
        wind_dir_list[wx_data_index] = forecast_wind_dir
        precip_list[wx_data_index] = forecast_precip
    # End of for loop

    # Now compute the weighted average weather conditions from the list
    # In these cases, we use a custom method to properly handle missing values
    # Note that the sum of contributing weights can be different for each variable
    weighted_T, weighted_w_spd, weighted_w_gust, weighted_w_dir, weighted_precip = \
        (0 for _ in range(5))
    n_weighted_T, n_weighted_w_spd, n_weighted_w_gust, n_weighted_w_dir, n_weighted_precip = \
        (0 for _ in range(5))
    for ix in range(16):
        if temperature_list[ix] > -99:
            weighted_T += temperature_list[ix] * weights_list[ix]
            n_weighted_T += weights_list[ix]
        if wind_speed_list[ix] >= 0:
            weighted_w_spd += wind_speed_list[ix] * weights_list[ix]
            n_weighted_w_spd += weights_list[ix]           
        if wind_gust_list[ix] >= 0:
            weighted_w_gust += wind_gust_list[ix] * weights_list[ix]
            n_weighted_w_gust += weights_list[ix]    
        if wind_dir_list[ix] >= 0:
            weighted_w_dir += wind_dir_list[ix] * weights_list[ix]
            n_weighted_w_dir += weights_list[ix]    
        if precip_list[ix] >= 0:
            weighted_precip += precip_list[ix] * weights_list[ix]
            n_weighted_precip += weights_list[ix]    

    if(n_weighted_T > 0):
        weighted_T /= n_weighted_T
    else:
        weighted_T = 60    # Special case:  we want a non-zero default value
    if(n_weighted_w_spd > 0):
        weighted_w_spd /= n_weighted_w_spd
    if(n_weighted_w_gust > 0):
        weighted_w_gust /= n_weighted_w_gust
    if(n_weighted_w_dir > 0):
        weighted_w_dir /= n_weighted_w_dir
    if(n_weighted_precip > 0):
        weighted_precip /= n_weighted_precip

    # Now do the special computation for wind direction variation
    weighted_dirvar = 0
    n_weighted_dirvar = 0
    for ix,wind_dir in enumerate(wind_dir_list):
        if wind_dir >= 0:
            dir_diff = wind_dir - weighted_w_dir
            if dir_diff > 180:
                dir_diff = wind_dir - 360 - weighted_w_dir
            if dir_diff < -180:
                dif_diff = wind_dir - weighted_w_dir + 360
            weighted_dirvar += dir_diff * dir_diff * weights_list[ix]
            n_weighted_dirvar += weights_list[ix]
    if n_weighted_dirvar > 0:
        weighted_dirvar /= n_weighted_dirvar

    # Generate prediction based on model

    model_df =  pd.read_csv('score_model_data/score_model.csv')
    course = 0
    players = model_df[model_df['course_id'] == course]['player'].unique()
    scores = []
    for player in players:
        player_data = model_df.loc[(model_df['player'] == player) & (model_df['course_id'] == course)]
        player_ngames = player_data.mean()['n_values']
        player_score = player_data.mean()['intercept'] + \
            player_data.mean()['cumgame_coeff'] * (player_ngames + 1) +\
            player_data.mean()['T_coeff'] * weighted_T +\
            player_data.mean()['wspd_coeff'] * weighted_w_spd +\
            player_data.mean()['wgust_coeff'] * weighted_w_gust +\
            player_data.mean()['dirvar_coeff'] * weighted_dirvar +\
            player_data.mean()['precip_coeff'] * weighted_precip 
        player_var = player_data.mean()['mse']
        scores.append({'player':player,'est_score':player_score,'est_std':np.sqrt(player_var)})

    predicted_scores = pd.DataFrame(scores)
    predicted_scores.to_csv('score_model_data/predicted_scores_0_2019-08-04')
