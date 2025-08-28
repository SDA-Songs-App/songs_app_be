import { LANGUAGES, PrismaClient, ROLES } from '@prisma/client';
import { release } from 'os';
var prisma = new PrismaClient();

async function main() {
  // Create Artists
  const artist1 = await prisma.artist.create({
    data: {
      name: 'ገርጂ ቤ/ን መዘምራን',
      genre: 'የምጻት ዝማሬ',
      bio: 'የገርጂ የመዘምራን ኳየር የተዘመረ መዝሙር ነው፡፡',
      imageUrl: 'https://example.com/artist1.jpg',
    },
  });

  const artist2 = await prisma.artist.create({
    data: {
      name: 'ተፈራ ወ/ማሪያም',
      genre: 'የጸሎት መዝሙር',
      bio: 'ተፈራ ወ/ማሪያም ብዙ አልበሞች ያሉት የድሮ የአድቬንትስት ዘማሪ ነው፡፡',
      imageUrl: 'https://example.com/artist2.jpg',
    },
  });

  // Create Albums
  const album1 = await prisma.album.create({
    data: {
      title: 'በደመና ይመለሳል',
      artistId: artist1.Id,
      releaseDate: new Date('2013-01-01'),
      coverImageUrl: 'https://example.com/pop-hits.jpg',
    },
  });

  const album2 = await prisma.album.create({
    data: {
      title: 'ኃይል ያለው በጉልበት ላይ ነው',
      artistId: artist2.Id,
      releaseDate: new Date('1999-07-15'),
      coverImageUrl: 'https://example.com/rock-legends.jpg',
    },
  });

  // Create Lyrics Contents
  const lyricsContent1 = await prisma.lyricsContents.create({
    data: {
      title: 'በደመና ይመለሳል',
      chorus: 'በደመና ይመለሳል በክብርም, ይመለሳል የወጉትም ያዩታል, ጌታ አይቀርም ይመጣል/2x/',
      verse1:
        'ጽድቅ የሚኖርባትን አዲስ ምድር ሊያወርሰን, እንደ ተስፋ ቃሉ ወደ ክብሩ ሊያገባን, ይመጣል/3/ በእርግጥም ይመጣል::',
      verse2:
        'የተስፋ ቃል የሰጠን እግዚአብሔር ታማኝ ነዉ, ሊፈጽመዉ ይችላል በትዕግሥት እንጠብቀዉ, በቃሉ በተስፋ ብንቆም መገለፁ አይቀርም::',
      verse3:
        'ለብዙዎች መዳን እያለ ቢዘገይም, የተናገረዉን ቃል በፍፁም አያጥፈዉም, ይመጣል አይቀርም ይመጣል አይዋሽም ይመጣል::',
      verse4:
        'መጨረሻዉ ተቃርቧል ጌታ የሱስ ይመጣል, ብለን ለሁሉ እናዉጅ ይህን የምስራች ቃል, ይመጣል ይመጣል እያልን እንናገር ምፃቱን::',
      verse5: '',
      verse6: '',
    },
  });

  const lyricsContent2 = await prisma.lyricsContents.create({
    data: {
      title: 'ኃይል ያለው በጉልበት ላይ ነው',
      chorus: ' ኃይል ያለው በጉልበት ላይ ነው /2x/, መንበርከክ መፀለይ ካለ, ሁሉም ነገር በእጃችን አለ::',
      verse1:
        'ሙሴ በኮሬብ ተራራ እግዚአብሄርን ያናገረው, በደመና ውስጥ ተከብቦ ክብሩን ማየት የቻለው, አርባ ቀንና አርባ ሌሊት በመፆም በመፀለይ ነው::',
      verse2:
        'ሐና ለረጅም ዓመታት በምላስ ዱላ ተመትታ, ጣውንቷ ስታስጨንቃት ሁል ጊዜ ጧትና ማታ, ለአምላኳ ነግራ አልቅሳ ሳሙኤልን ሰጣት ጌታ::',
      verse3:
        'ኤልያስ ሦስት ዓመት ሙሉ ዝናብ እንዳይወርድ የዘጋው, በእምነት በፀሎት ኃይል ነው አመፀኛውን ሕዝብ የቀጣው, ለነገሥታትና ለአህዛብ የአምላኩን ክንድ የገለጸው::',
      verse4:
        'በአንበሳ ጉድጓድ ውስጥ አድሮ ዳርዮስ ጠርቶ የጠየቀው, ዳንኤል አሳደረህ ወይ አምላክህ የምታመልከው, አዎን ድኜ አድሬአለሁ አምላኬን አከብረዋለሁ::',
      verse5: '',
      verse6: '',
    },
  });

  // Create Lyrics
  await prisma.lyrics.create({
    data: {
      albumId: album1.Id,
      artistId: artist1.Id,
      audioFileUrl: 'https://example.com/song-a.mp3',
      language: LANGUAGES.AMHARIC,
      LyricsContents:{
  create:{
  title: 'በደመና ይመለሳል',
  chorus: 'በደመና ይመለሳል በክብርም, ይመለሳል የወጉትም ያዩታል, ጌታ አይቀርም ይመጣል/2x/',
  verse1:'ጽድቅ የሚኖርባትን አዲስ ምድር ሊያወርሰን, እንደ ተስፋ ቃሉ ወደ ክብሩ ሊያገባን, ይመጣል/3/ በእርግጥም ይመጣል::',
  verse2:'የተስፋ ቃል የሰጠን እግዚአብሔር ታማኝ ነዉ, ሊፈጽመዉ ይችላል በትዕግሥት እንጠብቀዉ, በቃሉ በተስፋ ብንቆም መገለፁ አይቀርም::',
  verse3:'ለብዙዎች መዳን እያለ ቢዘገይም, የተናገረዉን ቃል በፍፁም አያጥፈዉም, ይመጣል አይቀርም ይመጣል አይዋሽም ይመጣል::',
  verse4:'መጨረሻዉ ተቃርቧል ጌታ የሱስ ይመጣል, ብለን ለሁሉ እናዉጅ ይህን የምስራች ቃል, ይመጣል ይመጣል እያልን እንናገር ምፃቱን::',
  verse5: '',
  verse6: '',
  }
      }
    },
  });

  await prisma.lyrics.create({
    data: {
      albumId: album2.Id,
      artistId: artist2.Id,
      audioFileUrl: 'https://example.com/song-b.mp3',
      language: LANGUAGES.AMHARIC,
      LyricsContents:{
        create:{
      title: 'ኃይል ያለው በጉልበት ላይ ነው',
      chorus: ' ኃይል ያለው በጉልበት ላይ ነው /2x/, መንበርከክ መፀለይ ካለ, ሁሉም ነገር በእጃችን አለ::',
      verse1:'ሙሴ በኮሬብ ተራራ እግዚአብሄርን ያናገረው, በደመና ውስጥ ተከብቦ ክብሩን ማየት የቻለው, አርባ ቀንና አርባ ሌሊት በመፆም በመፀለይ ነው::',
      verse2:'ሐና ለረጅም ዓመታት በምላስ ዱላ ተመትታ, ጣውንቷ ስታስጨንቃት ሁል ጊዜ ጧትና ማታ, ለአምላኳ ነግራ አልቅሳ ሳሙኤልን ሰጣት ጌታ::',
      verse3:'ኤልያስ ሦስት ዓመት ሙሉ ዝናብ እንዳይወርድ የዘጋው, በእምነት በፀሎት ኃይል ነው አመፀኛውን ሕዝብ የቀጣው, ለነገሥታትና ለአህዛብ የአምላኩን ክንድ የገለጸው::',
      verse4:'በአንበሳ ጉድጓድ ውስጥ አድሮ ዳርዮስ ጠርቶ የጠየቀው, ዳንኤል አሳደረህ ወይ አምላክህ የምታመልከው, አዎን ድኜ አድሬአለሁ አምላኬን አከብረዋለሁ::',
      verse5: '',
      verse6: '',
        }
      }
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
        firstName:"user1",
        LastName:"Thom",
      userName: 'user1',
      email: 'userone1@gmail.com',
      password: 'password123',
      role: ROLES.GUEST,
      phone: '0923-456-789',
    },
  });

  const user2 = await prisma.user.create({
    data: {
        firstName:"Test",
        LastName:"Adom",
      userName: 'admin Test',
      email: 'admin2@gmail.com',
      password: 'password123',
      role: ROLES.ADMIN,
      phone: '987-654-3210',
    },
  });

  // Create Favorites
  await prisma.favorites.create({
    data: {
      userId: user1.Id,
      lyricsId: 1, // Assume first lyric created
    },
  });

  await prisma.favorites.create({
    data: {
      userId: user2.Id,
      lyricsId: 2, // Assume second lyric created
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });