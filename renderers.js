
const renderLeetcodeCard = (userInfo) => {
    let userFullName = '';

    if (userInfo.realName) {
        userFullName = userInfo.realName.split(' ').map((name) => name[0].toUpperCase() + name.slice(1)).join(' ');
    }else{
        userFullName = userInfo.username;
    }

    const rankText = userInfo.ranking ? userInfo.ranking : 'Unranked';
    const questionsSolvedText = userInfo.totalSolved ? userInfo.totalSolved : '0';
    const easyQuestionsSolvedText = userInfo.easySolved ? userInfo.easySolved : '0';
    const mediumQuestionsSolvedText = userInfo.mediumSolved ? userInfo.mediumSolved : '0';
    const hardQuestionsSolvedText = userInfo.hardSolved ? userInfo.hardSolved : '0';

    const usernameColor = "#808080";
    const fontFamily = '"Arial, sans-serif"';
    const fontSizeText = '"15"';

    const cardHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 250">

        <rect x="0" y="0" width="400" height="260" fill="red" rx="10"/>
        <rect x="1" y="1" width="395" height="255" fill="#000000" rx="10" />

        <text x="200" y="35" text-anchor="middle" font-family=${fontFamily} font-size="18" fill="#fff" font-weight="bold">
            ${userFullName}'s Leetcode Stats
        </text>

        <image x="55" y="52" width="24" height="24" href="${userInfo.userAvatar}" clip-path="url(#clip-circle)"/>

        <a href="https://leetcode.com/u/${userInfo.handle}" target="_blank" text-anchor="middle">
            <text x="200" y="70" font-family=${fontFamily} font-size="17" font-weight="bold" fill="${usernameColor}">${userInfo.handle}</text>
        </a>

        <text x="50" y="110" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Rank: </text>
        <text x="180" y="110" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${rankText}</text>
        
        <text x="50" y="140" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Total solved: </text>
        <text x="180" y="140" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${questionsSolvedText}</text>

        <text x="50" y="170" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Easy solved: </text>
        <text x="180" y="170" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${easyQuestionsSolvedText}</text>

        <text x="50" y="200" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Medium solved: </text>
        <text x="180" y="200" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${mediumQuestionsSolvedText}</text>

        <text x="50" y="230" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Hard solved: </text>
        <text x="180" y="230" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${hardQuestionsSolvedText}</text>
        
    </svg>`;
    return cardHTML;
}

const renderCodeForcesCard = (userInfo) => {

    let userFullName = '';
    if (userInfo.firstName) {
        userFullName = userInfo.firstName[0].toUpperCase() + userInfo.firstName.slice(1) + ' ';
        if (userInfo.lastName) {
            userFullName += userInfo.lastName[0].toUpperCase() + userInfo.lastName.slice(1);
        }
    }else{
        userFullName = userInfo.handle;
    }

    const rankText = userInfo.rank ? userInfo.rank : 'Unrated';
    const ratingText = userInfo.rating ? userInfo.rating : 'Unrated';
    const maxRatingText = userInfo.maxRating ? userInfo.maxRating : 'Unrated';
    
    const fontFamily = '"Arial, sans-serif"';
    const fontSizeText = '"15"';
    const usernameColor = getUsernameColor(userInfo.rating ? userInfo.rating : 0);

    const cardHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 250">

        <rect x="0" y="0" width="400" height="260" fill="red" rx="10" />
        <rect x="1" y="1" width="395" height="255" fill="#000000" rx="10" />

        <text x="200" y="45" text-anchor="middle" font-family=${fontFamily} font-size="18" fill="#fff" font-weight="bold">
            ${userFullName}'s Codeforces Stats
        </text>
        
        <image x="55" y="78" width="24" height="24" href="${userInfo.avatar}" clip-path="url(#clip-circle)"/>
        
        <a href="https://codeforces.com/profile/${userInfo.handle}" target="_blank" text-anchor="middle">
            <text x="200" y="95" font-family=${fontFamily} font-size="17" font-weight="bold" text-anchor="middle" fill="${usernameColor}">${userInfo.handle}</text>
        </a>

        <text x="50" y="140" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Rank: </text>
        <text x="180" y="140" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${rankText}</text>
        
        <text x="50" y="170" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Rating: </text>
        <text x="180" y="170" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${ratingText}</text>
        
        <text x="50" y="200" font-family=${fontFamily} font-size=${fontSizeText} fill="#fff" font-weight="bold">Max Rating: </text>
        <text x="180" y="200" font-family=${fontFamily} font-size=${fontSizeText} fill="#007bff" font-weight="bold">${maxRatingText}</text>

    </svg>`;
    return cardHTML;
}

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

export { renderLeetcodeCard, renderCodeForcesCard };