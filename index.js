import express from "express";
import cors from "cors";

import { renderLeetcodeCard, renderCodeForcesCard } from "./renderers.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/api/leetcode/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        let userInfo = await response.json();
        
        if (userInfo.status === "error") {
            res.status(404).json({ message: "User with that username was not found" });
            return;
        }
        
        const userMetaResponse = await fetch(`https://leetcode.com/graphql/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "query": "\n    query userPublicProfile($username: String!) {\n  matchedUser(username: $username) {\n    contestBadge {\n      name\n      expired\n      hoverText\n      icon\n    }\n    username\n    githubUrl\n    twitterUrl\n    linkedinUrl\n    profile {\n      ranking\n      userAvatar\n      realName\n      aboutMe\n      school\n      websites\n      countryName\n      company\n      jobTitle\n      skillTags\n      postViewCount\n      postViewCountDiff\n      reputation\n      reputationDiff\n      solutionCount\n      solutionCountDiff\n      categoryDiscussCount\n      categoryDiscussCountDiff\n    }\n  }\n}\n    ",
                "variables": {
                    "username": `${username}`
                },
                "operationName": "userPublicProfile"
            })
        });
        
        let userMeta = await userMetaResponse.json();
        userMeta = userMeta.data.matchedUser;

        userInfo = {
            ...userInfo,
            handle: userMeta.username,
            username: userMeta.username,
            ...userMeta.profile,
        }

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(await renderLeetcodeCard(userInfo));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/api/cf/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`);
        const user = await response.json();
        if (user.status === "FAILED") {
            res.status(404).json({ message: "User with that username was not found" });
            return;
        }

        const userInfo = user.result[0];
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(await renderCodeForcesCard(userInfo));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const PORT = 5080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});