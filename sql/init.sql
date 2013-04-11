drop table if exists Users;
drop table if exists Tashs;
drop table if exists Tashed;
drop table if exists Following;

create table Users(
	uname varchar(50) primary key not null,
	pwd varchar(50) not null,
	fname varchar(50) not null,
	lname varchar(50) not null,
	email varchar(50) not null
);

create table Tashs(
	uname varchar(50) not null,
	content varchar(140) not null,
	tdate text not null,
	foreign key(uname) references Users(uname)
);

-- create table Tashed(
-- 	uid varchar(50) not null,
-- 	tid integer not null,
-- 	foreign key(uid) references Users(uid),
-- 	foreign key(tid) references Tashs(tid)
-- );

create table Following(
	follower varchar(50) not null,
	followee varchar(50) not null,
	foreign key(follower) references Users(uname),
	foreign key(followee) references Users(uname)
);

insert into Users values
	("BriGuy", "brian", "Brian", "Dragunas", "brian@dragunas.com"),
	("SamIAm", "samuel", "Samuel", "Nascimento", "sammueln@gmail.com"),
	("JohnJohn", "john", "John", "Coschigano", "jcoschig@student.umass.edu"),
	("TonyBologna", "anthony", "Anthony", "Battaglia", "atbattag@gmail.com");

insert into Tashs values
	("BriGuy", "brian tash number 1", "2013-04-10 12:00:00.000"),
	("BriGuy", "brian tash number 2", "2013-05-10 12:00:00.000"),
	("BriGuy", "brian tash number 3", "2013-03-10 12:00:00.000"),
	("BriGuy", "brian tash number 4", "2013-04-10 12:00:00.000"),
	("BriGuy", "brian tash number 5", "2013-03-10 12:00:00.000"),
	("SamIAm", "samuel tash number 1", "2013-02-10 12:00:00.000"),
	("SamIAm", "samuel tash number 2", "2013-08-10 12:00:00.000"),
	("SamIAm", "samuel tash number 3", "2013-12-10 12:00:00.000"),
	("SamIAm", "samuel tash number 4", "2013-10-10 12:00:00.000"),
	("JohnJohn", "john tash number 1", "2013-10-10 12:00:00.000"),
	("JohnJohn", "john tash number 2", "2013-05-10 12:00:00.000"),
	("JohnJohn", "john tash number 3", "2013-03-10 12:00:00.000"),
	("TonyBologna", "anthony tash number 1", "2013-05-10 12:00:00.000"),
	("TonyBologna", "anthony tash number 2", "2013-02-10 12:00:00.000"),
	("TonyBologna", "anthony tash number 3", "2013-01-10 12:00:00.000"),
	("TonyBologna", "anthony tash number 4", "2013-01-10 12:00:00.000"),
	("TonyBologna", "anthony tash number 5", "2013-11-10 12:00:00.000");

insert into Following values
	("TonyBologna", "TonyBologna"),
	("BriGuy", "BriGuy"),
	("JohnJohn", "JohnJohn"),
	("SamIAm", "SamIAm"),
	("TonyBologna", "BriGuy"),
	("TonyBologna", "JohnJohn"),
	("BriGuy", "SamIAm"),
	("JohnJohn", "SamIAm"),
	("JohnJohn", "TonyBologna"),
	("SamIAm", "TonyBologna"),
	("SamIAm", "JohnJohn");

