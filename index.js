import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const getUsernameColor = (rating) => {
    if (rating < 1200) return "#808080"; // Newbie
    if (rating < 1400) return "#00A0A0"; // Pupil
    if (rating < 1600) return "#0066CC"; // Specialist
    if (rating < 1900) return "#0066FF"; // Expert
    if (rating < 2100) return "#C80000"; // Candidate Master
    if (rating < 2300) return "#FF4C00"; // Master
    if (rating < 2400) return "#FF9B00"; // International Master
    if (rating < 2600) return "#FF4CFF"; // Grandmaster
    if (rating < 2900) return "#A400FF"; // International Grandmaster
    return "#800080"; // Legendary Grandmaster
};

app.get("/api/info/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`);
        const user = await response.json();
        if (user.status === "FAILED") {
            res.status(404).json({ message: "User with that username was not found" });
        } else {
            const userInfo = user.result[0];
                

            const usernameColor = getUsernameColor(userInfo.rating ? userInfo.rating : 0);

            const rankText = userInfo.rank ? userInfo.rank : 'Unrated';
            const ratingText = userInfo.rating ? userInfo.rating : 'Unrated';
            const maxRatingText = userInfo.maxRating ? userInfo.maxRating : 'Unrated';
            const fontFamily = '"Arial, sans-serif"';
            const fontSizeText = '"15"';
        
            const cardHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">

                <rect x="0" y="0" width="400" height="250" fill="red" rx="10" />
                <rect x="1" y="1" width="395" height="245" fill="#000000" rx="10" />
    
                <text x="200" y="35" text-anchor="middle" font-family=${fontFamily} font-size="18" fill="#fff" font-weight="bold">
                    ${userInfo.firstName} ${userInfo.lastName}'s CF Stats
                </text>
                
                <a href="https://codeforces.com/profile/${userInfo.handle}" target="_blank" text-anchor="middle">
                    <text x="200" y="85" font-family=${fontFamily} font-size="18" font-weight="bold" text-anchor="middle" fill="${usernameColor}">${userInfo.handle}</text>
                </a>

                <text x="50" y="115" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Rank: </text>
                <text x="150" y="115" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${rankText}</text>
                
                <text x="50" y="145" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Rating: </text>
                <text x="150" y="145" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${ratingText}</text>
                
                <text x="50" y="175" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Max Rating: </text>
                <text x="150" y="175" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${maxRatingText}</text>

            </svg>`;
            res.setHeader('Content-Type', 'image/svg+xml');
            res.send(cardHTML);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const PORT = 5080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});