CREATE SEQUENCE public.posts_postid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.posts
(
    postid integer NOT NULL DEFAULT nextval('posts_postid_seq'::regclass),
    posttitle text COLLATE pg_catalog."default",
    username text COLLATE pg_catalog."default",
    posttext text COLLATE pg_catalog."default",
    postimage text COLLATE pg_catalog."default",
    CONSTRAINT posts_pkey PRIMARY KEY (postid)
);

CREATE SEQUENCE public.comments_commentid_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.comments
(
    commentid integer NOT NULL DEFAULT nextval('comments_commentid_seq'::regclass),
    postid integer NOT NULL,
    commentauthor text COLLATE pg_catalog."default",
    commenttext text COLLATE pg_catalog."default",
    commentdate date,
    CONSTRAINT comments_pkey PRIMARY KEY (commentid)
);

INSERT INTO public.posts(
	postid, posttitle, username, posttext, postimage)
	VALUES (nextval('posts_postid_seq'), 
			'This post was inserted using psql', 
			'Richard', 
			'This is the text', 
			'\there\is\no\image'
		  	);
			
INSERT INTO public.comments(
	commentid, postid, commentauthor, commenttext, commentdate)
	VALUES (nextval('comments_commentid_seq'), 1, 'Richard', 'Some comment that', '12/12/2020');