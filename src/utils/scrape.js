const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://www.dangdang.com/");

    // hover every item to load
    for (let i = 1; i <= 15; i++) {
        const item = await page.waitForSelector(`.n_b:nth-child(${i})`)
        const itemInfo = await item.boundingBox();
        await page.mouse.move(itemInfo.x, itemInfo.y);
    }

    const genre_info = await page.evaluate(() => {
        const data = [];
        const menu_title = document.querySelectorAll(".n_b>:nth-child(1)"),
            show_info = document.querySelectorAll(".left_box");
        // sub_link = document.querySelectorAll(".left_box .new_pub_pop_guan"),
        // sub_title1 = document.querySelectorAll(".left_box .left_03 h4"),
        // sub_title2 = document.querySelectorAll(".left_box .left_01 h4"),
        // sub_item = document.querySelectorAll(".left_01 .e a");
        console.log("info" + show_info)
        for (let i = 0; i < 15; i++) {
            const obj = {
                key: i,
                menu_title: menu_title[i].innerText,
                show_info: show_info[i]?.innerHTML,
            };
            console.log(obj)
            data.push(obj);
        }
        return data;
    })

    await browser.close();
    return genre_info;
})()
    .then(res => {
        const menuData = JSON.stringify(res);
        const file = path.join(__dirname, "../data/menu.json");
        fs.writeFile(file, menuData, err => {
            if (err) {
                console.log(err)
            } else {
                console.log("Write success")
            }
        })
        // console.log(res)
    })