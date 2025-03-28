const generateFavicon = (text = "P") => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff"; // White background
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "#000000"; // Black text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const favicon = document.getElementById("dynamic-favicon");
    favicon.href = canvas.toDataURL("image/png");
};

export default generateFavicon;
