import { PrismaClient } from "@prisma/client";
import { release } from "os";
var prisma  = new PrismaClient();
async function main(){
   const lyricsContent1= await prisma.lyricsContents.create({
        data:{
         title :"በደመና ይመለሳል ",
         chorus:"በደመና ይመለሳል በክብርም, ይመለሳል የወጉትም ያዩታል, ጌታ አይቀርም ይመጣል/2x/ ", 
         verse1 : " ጽድቅ የሚኖርባትን አዲስ ምድር ሊያወርሰን እንደ ተስፋ ቃሉ ወደ ክብሩ ሊያገባን ይመጣል/3/ በእርግጥም ይመጣል",
         verse2 :" የተስፋ ቃል የሰጠን እግዚአብሔር ታማኝ ነዉ ሊፈጽመዉ ይችላል በትዕግሥት እንጠብቀዉ በቃሉ በተስፋ ብንቆም መገለፁ አይቀርም",
         verse3:" ይመጣል አይቀርም ይመጣል አይዋሽም ይመጣል ይመጣል አይቀርም ይመጣል አይዋሽም ይመጣል ይመጣል አይቀርም ይመጣል አይዋሽም ይመጣል",
         verse4 :"መጨረሻዉ ተቃርቧል ጌታ የሱስ ይመጣል ብለን ለሁሉ እናዉጅ ይህን የምስራች ቃል ይመጣል ይመጣል እያልን እንናገር ምፃቱን",
         verse5:"", 
         verse6:""
        }
    });
    const category1 = await prisma.category.create({
        data:{
            name:"ምስክርነት",
            description:"ጌታ እንደቃሉ ታማኝ ነው፡፡ ስለሆነም ሁላችንም የጌታን መምጣት መጠባበቅ አለብን"
            
        }
    });
    const artist1 = await prisma.artist.create({
        data:{
            name:'',
            genre:'',
            bio:'',
            imageUrl:'', 
            Album:{
                create:{
                    title:'ጌታ ይመጣል',
                    releaseDate: new Date('2023-03-04'),
                    coverImageUrl:'',
                }
            },
            Lyrics:{
                create:{
                    Id:1,
                    audioFileUrl:"",
                    language:'Amharic',
                    contentId:lyricsContent1.Id,
                    categoryId:category1.Id,
                    albumId:1
                }
            }
        }
    });
    const user1 = await prisma.user.create({
        data:{
          username:"",
          email:'',
          password:"",
          role:'guest',
          phone:"09123xxxx"  
        }
    });
    // seed favorites
    await prisma.favorites.create({
        data:{
            userId:user1.Id, 
            lyricsId:artist1.Lyrics[0].Id
        }
    });
    main()
    .catch((error) => console.error(error))
    .finally(async () =>{
        await prisma.$disconnect();
    })
}