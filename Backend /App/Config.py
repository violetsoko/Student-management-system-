from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'super-secret-key'  # change in production
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
