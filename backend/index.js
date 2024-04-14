const express = require("express");
const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "productdetails.db");

let db = null;

const initializeDbServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS products(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                image TEXT,
                price TEXT,
                off TEXT,
                orginalprice TEXT,
                category TEXT
            )
        `);

        //  const productDetails = [
        //     {
        //         title: "kamal",
        //         image: "https://res.cloudinary.com/dlh8nimmr/image/upload/v1713095103/SIPR04018_01_1_xi3vhf.png",
        //         price: "4899",
        //         off: "(50% Off)",
        //         orginalprice: "₹8999",
        //         category: "Kamal"  
        //     }

        //             // {
        //             //     title: "The Brown Metro Movers",
        //             //     image: "https://res.cloudinary.com/dlh8nimmr/image/upload/v1713095103/SIPR04018_01_1_xi3vhf.png",
        //             //     price: "4899",
        //             //     off: "(50% Off)",
        //             //     orginalprice: "₹8999",
        //             //     category: "Backpacks"  
        //             // },
        //             // {
        //             //     title: "The Metro Movers Black",
        //             //     image: "https://res.cloudinary.com/dlh8nimmr/image/upload/v1713095588/SIPR04031_01_1_muwnhh.png",
        //             //     price: "4899",
        //             //     off: "(50% Off)",
        //             //     orginalprice: "₹8999",
        //             //     category: "Backpacks"
        //             // },
        //             // {
        //             //     title: "The Metro Movers Black",
        //             //     image: "https://res.cloudinary.com/dlh8nimmr/image/upload/v1713095588/SIPR04085_01_1_zz0nac.png",
        //             //     price: "4899",
        //             //     off: "(50% Off)",
        //             //     orginalprice: "₹8999",
        //             //     category: "Backpacks"
        //             // },
        //             // {
        //             //     title: "The Metro Movers Black",
        //             //     image: "https://res.cloudinary.com/dlh8nimmr/image/upload/v1713095587/SIPR04086_01_1_ec5g43.png",
        //             //     price: "4899",
        //             //     off: "(50% Off)",
        //             //     orginalprice: "₹8999",
        //             //     category: "Backpacks"
        //             // }

        //     // {
        //     //     title: "black Pu Leather Elegant Designer hand bag",
        //     //     image: "https://5.imimg.com/data5/SELLER/Default/2022/5/QS/MN/LX/12671888/al89.jpg",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Hand bag"
        //     // },
        //     // {
        //     //     title: "Combo Sling Bag",
        //     //     image: "https://5.imimg.com/data5/ANDROID/Default/2022/5/ET/SP/XZ/13210508/product-jpeg.jpg",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Hand bag"
        //     // },
        //     // {
        //     //     title: "Gorgeous Stylishr Handbag, Combo wallet",
        //     //     image: "https://images.meesho.com/images/products/157222813/mtqas_512.jpg",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Hand bag"
        //     // },
        //     // {
        //     //     title: "Women Handbag Shoulder Bag Girls Fashion Famous",
        //     //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfbb1PZJig21a1rrt656q8EJKEKI6aUmcS-NbHz9OeAorIfLZL0ZyeIe7G_1J9l98dcY&usqp=CAU",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Hand bag"
        //     // },
        //     // {
        //     //     title: "NICOLE&DORIS New Handbag for Women",
        //     //     image: "https://m.media-amazon.com/images/I/61DhB0kQIVL._AC_SL1200_.jpg",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Hand bag"
        //     // },
        //     // {
        //     //     title: "Toyella Shoulder Bag Women Tattoo Flower",
        //     //     image: "https://i5.walmartimages.com/asr/d6de7af9-5805-49a5-bd11-aacfbcdaf48a.50d881b1b919ef612a7e0c15fe02d83f.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Hand bag"
        //     // },
        //     // {
        //     //     title: "Toyella Shoulder Bag Women Tattoo Flower",
        //     //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHNZ9YpboC5lrm4jeIkGkdPqp5zUGgyKXmxW46b9kLs6mf05dgHNgVRpFxZzu2q13FiF8&usqp=CAU",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Hand bag"
        //     // },
        //     // {
        //     //     title: "Black Plain Premium Quality Designer Leather Hand",
        //     //     image: "https://5.imimg.com/data5/SELLER/Default/2023/6/314069169/JT/EL/DI/189638314/premium-quality-designer-leather-hand-bag-500x500.jpeg",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Hand bag"
        //     // }



        //     // {
        //     //     title: "ELITEHOME Multi-color Leather Travel Cosmetic",
        //     //     image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/vanity-box/b/p/m/multi-color-leather-travel-cosmetic-vanity-bag-makeup-pouch-for-original-imaghetwfuveazbm.jpeg?q=20&crop=false",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Vanity Pouch"
        //     // },
        //     // {
        //     //     title: "Wax Leather Vanity Pouch - Cognac",
        //     //     image: "https://www.damilano.com/cdn/shop/files/VP-10023CONWAX_2_1400x.jpg?v=1706353208",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Vanity Pouch"
        //     // },
        //     // {
        //     //     title: "Personalized Large Vanity Pouch - Wine",
        //     //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKnckEKBWoAJRIMQMjg1Es7HwBeYAlTCY8gwPwcY61Rw&s",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Vanity Pouch"
        //     // },
        //     // {
        //     //     title: "Lancome Pink Makeup Cosmetic Bag / Travel",
        //     //     image: "https://i.ebayimg.com/images/g/YEYAAOSwcpte6uy7/s-l400.jpg",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Vanity Pouch"
        //     // },
        //     // {
        //     //     title: "Nirency Portable Travel Makeup Pouch, Vanity Bag",
        //     //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKrp6oRcdrPBdE5t1CZho6tixWCvqZWDUVfVHJt5tlA&s",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Vanity Pouch"
        //     // },
        //     // {
        //     //     title: "MIRASON Cosmetic Bag Set of Makeup Bag for",
        //     //     image: "https://rukminim1.flixcart.com/image/850/1000/xif0q/travel-pouch/4/g/r/cosmetic-bag-makeup-pouch-travel-zipper-organizer-bag-for-girl-original-imaggmyhcvmjxjaf.jpeg?q=20",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Vanity Pouch"
        //     // },
        //     // {
        //     //     title: "MIRASON Cosmetic Bag Set of 3 Makeup Bag for",
        //     //     image: "https://mirasonshop.com/cdn/shop/files/1MIRASONCosmeticBagSetof3MakeupBagforPursePouchTravelBeautyZipperOrganizerBagGiftsforGirlWomen_PULeatherWashableWaterproofyellow_300x300.jpg?v=1691723413",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Vanity Pouch"
        //     // },
        //     // {
        //     //     title: "Trendegic PU Leather Zipper Cosmetic",
        //     //     image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/pouch-potli/h/v/h/pu-leather-waterproof-zipper-cosmetic-travel-toiletry-make-up-original-imagkyfvhxegggt7.jpeg?q=90&crop=false",
        //     //     price: "4899",
        //     //     off: "(50% Off)",
        //     //     orginalprice: "₹8999",
        //     //     category:"Vanity Pouch"
        //     // }
        // ];

        // const insertProduct = await db.prepare(`
        //     INSERT INTO products (title, image, price, off, orginalprice, category)
        //     VALUES (?, ?, ?, ?, ?, ?)
        // `);

        // for (const product of productDetails) {
        //     await insertProduct.run(product.title, product.image, product.price, product.off, product.orginalprice, product.category);
        // }

        // await insertProduct.finalize();
        // await db.run(`
        //     ALTER TABLE products
        //     ADD COLUMN category TEXT
        // `);
        // const updateProducts = await db.prepare(`
        //     UPDATE products
        //     SET category = 'Bag'
        //     WHERE category IS NULL
        // `);

        // const result = await updateProducts.run();
        // console.log(`${result.changes} rows updated`);

        // await updateProducts.finalize();
    } catch (e) {
        console.log(e.message);
    }
}

initializeDbServer();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// app.get("/", async(req, res) => {
//     const data = `SELECT * FROM products`
//     const result = await db.all(data)
//     console.log(result)
//     res.send(result)
// })