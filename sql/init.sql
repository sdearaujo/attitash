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
	tdate timestamp not null,
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
	("AnthonyB", "anthony", "Anthony", "Battaglia", "atbattag@gmail.com"),
	("realDonaldTrump", "donald", "Donald", "Trump", "donald@trump.com"),
	("TechCrunch", "techcrunch", "TechCrunch", "", "tech@techcrunch.com"),
	("nodejs", "nodejs", "node", "js", "node@nodejs.com"),
	("BarackObama", "barack", "Barack", "Obama", "mr@president.com");

insert into Following values
	("BrianD", "BrianD"),
	("SamN", "SamN"),
	("JohnC", "JohnC"),
	("AnthonyB", "AnthonyB"),
	("realDonaldTrump", "realDonaldTrump"),
	("TechCrunch", "TechCrunch"),
	("nodejs", "nodejs"),
	("BarackObama", "BarackObama"),
	("BrianD", "AnthonyB"),
	("BrianD", "SamN"),
	("BrianD", "nodejs"),
	("BrianD", "BarackObama"),
	("SamN", "AnthonyB"),
	("SamN", "realDonaldTrump"),
	("SamN", "BarackObama"),
	("JohnC", "AnthonyB"),
	("JohnC", "BrianD"),
	("JohnC", "BarackObama"),
	("AnthonyB", "BrianD"),
	("AnthonyB", "JohnC"),
	("AnthonyB", "TechCrunch"),
	("AnthonyB", "nodejs"),
	("realDonaldTrump", "SamN"),
	("realDonaldTrump", "BarackObama"),
	("TechCrunch", "AnthonyB"),
	("TechCrunch", "nodejs"),
	("nodejs", "TechCrunch"),
	("BarackObama", "realDonaldTrump"),
	("BarackObama", "BrianD");

insert into Tashs values
	("BrianD", "@AnthonyB this is such a cool website #attitash", datetime('now','-2 months', '-5 days', 'localtime')),
	("BrianD", "just got rid of #twitter in favor of #attitash", datetime('now','-2 months', '-17 days', 'localtime')),
	("BrianD", "Check out this cool #tash I just sent", datetime('now','-3 months', '-12 days', 'localtime')),
	("BrianD", "tashing 123", datetime('now','-1 months', '-3 days', 'localtime')),
	("BrianD", "@BarackObama you're welcome for turning you on to #attitash", datetime('now','-3 months', '-1 days', 'localtime')),
	("SamN", "@nodejs you guys rock", datetime('now','-2 months', '-20 days', 'localtime')),
	("SamN", "#tashing for days", datetime('now','-2 months', '-15 days', 'localtime')),
	("SamN", "I <3 #attitash", datetime('now','-2 months', '-10 days', 'localtime')),
	("SamN", "what's a tweet anyway", datetime('now','-1 months', '-14 days', 'localtime')),
	("JohnC", "#attitash > twitter #notevenclose", datetime('now','-2 months', '-13 days', 'localtime')),
	("JohnC", "cool new tash", datetime('now','-2 months', '-11 days', 'localtime')),
	("JohnC", "@AnthonyB @BrianD @SamN this is the best website ever", datetime('now','-1 months', '-3 days', 'localtime')),
	("AnthonyB", "tashes on tashes on tashes", datetime('now','-2 months', '-5 days', 'localtime')),
	("AnthonyB", "@JohnC whats up", datetime('now','-3 months', '-19 days', 'localtime')),
	("AnthonyB", "here is my new #tash", datetime('now','-2 months', '-23 days', 'localtime')),
	("AnthonyB", "hello, #attitash", datetime('now','-1 months', '-1 days', 'localtime')),
	("AnthonyB", "@realDonaldTrump @TechCrunch #tashing is the new cool thing", datetime('now','-4 months', '-0 days', 'localtime')),
	("realDonaldTrump", "invested $500k in #attitash #easiestmoneyiveevermade", datetime('now','-1 months', '-10 days', 'localtime')),
	("realDonaldTrump", "@BarackObama dude wth", datetime('now','-5 months', '-10 days', 'localtime')),
	("TechCrunch", "The new SM site leaving #twitter in the dust #attitash", datetime('now','-2 months', '-1 days', 'localtime')),
	("TechCrunch", "Just landed a pair of #GoogleGlass", datetime('now','-3 months', '-11 days', 'localtime')),
	("TechCrunch", "@AnthonyB are you available for an interview?", datetime('now','-5 months', '+4 days', 'localtime')),
	("nodejs", "Check out new #nodejs release", datetime('now','-2 months', '+1 days', 'localtime')),
	("BarackObama", "#MERICA", datetime('now','-3 months', '-12 days', 'localtime')),
	("BarackObama", "Really loving this #attitash site -bo", datetime('now','-3 months', '-12 days', 'localtime'));








