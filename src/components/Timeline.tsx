import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";

export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createAt: number;
}

const Wrapper = styled.div``;

export default function Timeline() {
    const [tweets, setTweet] = useState<ITweet[]>([]);
    const fetchTweets = async () => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(tweetsQuery);
        const tweets = snapshot.docs.map((doc) => {
            const { tweet, createAt, userId, username, photo } = doc.data();
            return {
                tweet,
                createAt,
                userId,
                username,
                photo,
                id: doc.id,
            };
        });
        setTweet(tweets);
    };

    useEffect(() => {
        fetchTweets();
    }, []);
    return (
        <Wrapper>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet} />
            ))}
        </Wrapper>
    );
}