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

create table Following(
	follower varchar(50) not null,
	followee varchar(50) not null,
	foreign key(follower) references Users(uname),
	foreign key(followee) references Users(uname)
);

insert into Users values
	("BrianD", "brian", "Brian", "Dragunas", "brian@dragunas.com"),
	("SamN", "samuel", "Samuel", "Nascimento", "sammueln@gmail.com"),
	("JohnC", "john", "John", "Coschigano", "jcoschig@student.umass.edu"),
	("AnthonyB", "anthony", "Anthony", "Battaglia", "atbattag@gmail.com");

insert into Tashs values
	("BrianD", "brian tash number 1", "2013-04-10 12:00:00.000"),
	("BrianD", "brian tash number 2", "2013-05-10 12:00:00.000"),
	("BrianD", "brian tash number 3", "2013-03-10 12:00:00.000"),
	("BrianD", "brian tash number 4", "2013-04-10 12:00:00.000"),
	("BrianD", "brian tash number 5", "2013-03-10 12:00:00.000"),
	("SamN", "samuel tash number 1", "2013-02-10 12:00:00.000"),
	("SamN", "samuel tash number 2", "2013-08-10 12:00:00.000"),
	("SamN", "samuel tash number 3", "2013-12-10 12:00:00.000"),
	("SamN", "samuel tash number 4", "2013-10-10 12:00:00.000"),
	("JohnC", "john tash number 1", "2013-10-10 12:00:00.000"),
	("JohnC", "john tash number 2", "2013-05-10 12:00:00.000"),
	("JohnC", "john tash number 3", "2013-03-10 12:00:00.000"),
	("AnthonyB", "anthony tash number 1", "2013-05-10 12:00:00.000"),
	("AnthonyB", "anthony tash number 2", "2013-02-10 12:00:00.000"),
	("AnthonyB", "anthony tash number 3", "2013-01-10 12:00:00.000"),
	("AnthonyB", "anthony tash number 4", "2013-01-10 12:00:00.000"),
	("AnthonyB", "anthony tash number 5", "2013-11-10 12:00:00.000");

insert into Following values
	("AnthonyB", "AnthonyB"),
	("BrianD", "BrianD"),
	("JohnC", "JohnC"),
	("SamN", "SamN"),
	("AnthonyB", "BrianD"),
	("AnthonyB", "JohnC"),
	("BrianD", "SamN"),
	("JohnC", "SamN"),
	("JohnC", "AnthonyB"),
	("SamN", "AnthonyB"),
	("SamN", "JohnC");

