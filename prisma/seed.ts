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
const artist3 = await prisma.artist.create({
    data: {
      name: 'አለሙ ብላቱ',
      genre: 'የጸሎት መዝሙር',
      bio: 'አለሙ ብላቱ ብዙ አልበሞች ያሉት የድሮ የአድቬንትስት ዘማሪ ነው፡፡',
      imageUrl: 'https://example.com/artist2.jpg',
    },
  });

  const artist4 = await prisma.artist.create({
    data: {
      name: 'Gimbie C. Choir',
      genre: 'የጸሎት መዝሙር',
      bio: 'Gimbie C. Choir ብዙ አልበሞች ያሉት የድሮ የአድቬንትስት ዘማሪ ነው፡፡',
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
    const album3 = await prisma.album.create({
    data: {
      title: 'ይናሽ በጋድነዳ',
      artistId: artist3.Id,
      releaseDate: new Date('1999-07-15'),
      coverImageUrl: 'https://example.com/rock-legends.jpg',
    },
  });

  const album4 = await prisma.album.create({
    data: {
      title: 'Lafarra tutturuu',
      artistId: artist4.Id,
      releaseDate: new Date('1999-07-15'),
      coverImageUrl: 'https://example.com/rock-legends.jpg',
    },
  });
  // Create Lyrics
  const amharicLocalization = await prisma.localizations.create({
  data: {
    language_key: "AMHARIC",
    Header: "የሸፗችዮ ዝምራ",
    notFound: "ዝምራ አቸም አነከዊ",
    author: "ገርጂ ቤ/ን መዘምራን",
    CopyErrorTitle: "ስህተት",
    CopyErrorDescription: "መዝሙሩን ማጋራት አልተቻለም።",
    LyricsCopiedTitle: "ተቀድቷል",
    LyricsCopiedDescription: "መዝሙሩ ወደ ቅንጥብ ሰሌዳ ተቀድቷል",
  },
});

const guragignaLocalization = await prisma.localizations.create({
  data: {
    language_key: "GURAGIGNA",
    Header: "የሸፗችዮ ዝምራ",
    notFound: "ዝምራ አቸም አነከዊ",
    author: "",
    CopyErrorTitle: "ስህተት",
    CopyErrorDescription: "መዝሙሩን ማጋራት አልተቻለም።",
    LyricsCopiedTitle: "ተቀድቷል",
    LyricsCopiedDescription: "መዝሙሩ ወደ ቅንጥብ ሰሌዳ ተቀድቷል",
  },
});

const oromoLocalization = await prisma.localizations.create({
  data: {
    language_key: "Oromo",
        Header:"Faarfannoota filataman",
        notFound:"Faarfannaan hin argamne",
        author:"",
        CopyErrorTitle:"ስህተት",
        CopyErrorDescription:"መዝሙሩን ማጋራት አልተቻለም።",
        LyricsCopiedTitle:"ተቀድቷል",
        LyricsCopiedDescription:"መዝሙሩ ወደ ቅንጥብ ሰሌዳ ተቀድቷል",
  },
});
  await prisma.lyrics.create({
    data: {
      albumId: album1.Id,
      artistId: artist1.Id,
      audioFileUrl: 'https://example.com/song-a.mp3',
      language: LANGUAGES.AMHARIC,
      LyricsContents:{
  create:{
  languageKey:amharicLocalization.language_key,
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
      languageKey:amharicLocalization.language_key,
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

    await prisma.lyrics.create({
    data: {
      albumId: album4.Id,
      artistId: artist4.Id,
      audioFileUrl: 'https://example.com/song-b.mp3',
      language: LANGUAGES.AFAAN_OROMO,
      LyricsContents: {
        create: {
          languageKey:oromoLocalization.language_key,
          title: 'Lafarra tutturuu',
          chorus:
            "Haadha irraa adda baatee daa'imni qofaa hafaa jirti\nDhalarra adda baatee haatimmoo gidirfamaa jirti\nBoo'icha irraan gadee kanatu hedduu nutti hammaate x2\nLola'uu dhiigaa hammaate kanaaf maal ta'a yoo dhufte\n",
          verse1:
            "Lafarra tutturuu jal'ina dachee ilaaluun nuffe\nWaan namatti hin tolle yaadaaf garaa namaas hin gammachiisne\nXoofoo hadhaa'aa dhugaa irbaata gaddaa nyaachuun\nHaa ga'u (x2) Yesuus nuuf mul'adhu\n",
          verse2:
            "Abjuun abjootamu sagaleekee kan ibsu tasa hin jiru\nYaaddoof yaadda'uudha maal taana laataadha har'a kan argamu\nBa'ee galuu yaadda'a dhugaa hin se'u namni\nAkka baalaa harca'ee dhumaa jira dhaloonni\n",
          verse3:
            "Gurraan kan dhageenyu ijaan kan arginu hundumtuu hamaa\nWaan namatti tolu dhagahuun har'a daran yarateera\nAt dursitee nutti himte kun hunduu akka ta'u\nBarri xumuramee akka goolabbiin ta'u\n\n",
          verse4:
            "Harka keenya qabi dachee horsossaa'erra turuu hin feenu\nWanta suukanneessaa hin feenu nuyi kana caala ilaaluu\nDafi ofitti nu fudhu nun tursiini lafarra\nMul'achuukee hawwine yoomuma nuuf dhufta\n",
          verse5: '',
          verse6: '',
        },
      },
    },
  });

  await prisma.lyrics.create({
    data: {
      albumId: album3.Id,
      artistId: artist3.Id,
      audioFileUrl: 'https://example.com/song-b.mp3',
      language: LANGUAGES.GURAGIGNA,
      LyricsContents: {
        create: {
          title: 'ይናሽ በጋድነዳ',
          languageKey:guragignaLocalization.language_key,
          chorus: ' ይናሽ በጋደንዳ ይናሸ ባማደንዳ\nትንም ንቅ የኸረ ይሱስ ጔታነዳ\nአሜን የሱስ አባንዳ \n',
          verse1:
            'ሲጣር ይና ቲሽ ቢቸን ተደወታ  \nባነ ቲና ግዝይ ንቅ የኽረ  ጔታ \nይና አትጨንቅ በዋናም በምሳረ\nትንም ንቅ የኸረ የሱስንዳ ነረ  አሜን የሱሰንዳ ነረ\n',
          verse2:
            'ጔታ ቲጠራንደ ትክኖ ቲብርንደ\nእዮ ይሽርኸማ ትሁትም ቲያስድንደ\nተጥፚ ጥፚ ዘንጋ እንምጊ ይቅየንደ\nያገነንደ እንም የሁዝህ ይብርንደ አሜን የሁዝህ ይብርንደ\n',
          verse3:
            'ይናሽ በጋደንዳ የሱስ  ነመደንደም\nይናሽ ባማደንዳ ትከሮ ባረንደም\nትፍትሜ ተንቛሜ ይቅየንደቃር ናኸም\nምስጋና የሁት የኽር የዝህ አበቃንደም አሜን የዝህ አበቃንደም\n',
          verse4:
            'ቲያጌንደ ይና የሁትሄ  ንሮጥነ\nጅጔረንዳ ኑድኔይ  ይፈተቴ ንቸነ\nየሱስ ያገነደ  እንም ቃር አበንደም \nእዮ ዝህ ንቅ ጔታ መምር ነመደንደም አሜን መምር ነመደንደም\n',
          verse5: '',
          verse6: '',
        },
      },
    },
  });
// Create Localizations


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