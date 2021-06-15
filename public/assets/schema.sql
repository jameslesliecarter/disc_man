-- Log into your MySQL db specifying the local-infile flag
-- mysql -u[username] -p[password] --local-infile

-- Once logged in, set permission to load local infile
-- SET GLOBAL local_infile = 1;

-- -- MySQL Schema
-- You can copy and paste this into your terminal after logging into your local MySQL service to create
-- the required database and associated tables.

CREATE DATABASE lets_disc;
USE lets_disc;

CREATE TABLE discs (
  id INTEGER UNIQUE AUTO_INCREMENT,
  brand VARCHAR(50),
  model VARCHAR(50),
  SPEED DECIMAL(3,1),
  GLIDE DECIMAL(2,1),
  TURN DECIMAL(2,1),
  FADE DECIMAL(2,1),
  PRIMARY KEY (id)
);

CREATE TABLE golfers (
  id INTEGER UNIQUE AUTO_INCREMENT,
  name VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE bags (
  id INTEGER UNIQUE AUTO_INCREMENT,
  id_golfer INTEGER,
  id_disc INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (id_golfer) REFERENCES golfers(id),
  FOREIGN KEY (id_disc) REFERENCES discs(id)
);

-- Run the following command to populate the discs into the db.

LOAD DATA LOCAL INFILE 'public/assets/discs.csv' INTO TABLE discs
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
(id, brand, model, SPEED, GLIDE, TURN, FADE);

-- Now your database should be in good shape!
