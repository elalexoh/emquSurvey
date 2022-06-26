import { Hours, Survey } from './../models/survey.model';
import { defineStore } from 'pinia'
export const useSurveyStore = defineStore({
  id: 'survey',
  state: () => ({
    step: 1,
    ageRanges: [
      {
        _id: 'range-a',
        label: '18 - 25'
      },
      {
        _id: 'range-b',
        label: '26 - 33'
      },
      {
        _id: 'range-c',
        label: '34 - 40'
      },
      {
        _id: 'range-d',
        label: '40+'
      },
    ],
    socialMedias: [
      {
        _id: 'sm-fc',
        label: 'Facebook'
      },
      {
        _id: 'sm-in',
        label: 'Instagram'
      },
      {
        _id: 'sm-tk',
        label: 'Tiktok'
      },
      {
        _id: 'sm-ws',
        label: 'WhatsApp'
      },
      {
        _id: 'sm-yt',
        label: 'Youtube'
      },
      {
        _id: 'sm-tw',
        label: 'Twitter'
      },
    ],
    surveys: [] as Survey[],
    loaded: false as boolean,
  }),
  getters: {
    getSurveys(): Survey[] {
      return this.surveys
    },
    getTotal(): number { return this.surveys.length },
    getSurveysByFav(): {} {
      return this.surveys.reduce((r, a) => {
        r[a.favSocialMedia] = [...(r[a.favSocialMedia] || []), a];
        return r;
      }, {});
    },
    getSurveysByAge(): {} {
      return this.surveys.reduce((r, a) => {
        r[a.ageRangeId] = [...(r[a.ageRangeId] || []), a];
        return r;
      }, {});
    },
    getHour() {
      let hoursData = {
        facebookTime: 0,
        instagramTime: 0,
        tiktokTime: 0,
        twitterTime: 0,
        whatsappTime: 0,
        youtubeTime: 0,
        // PROM
        facebookProm: 0,
        instagramProm: 0,
        tiktokProm: 0,
        twitterProm: 0,
        whatsappProm: 0,
        youtubeProm: 0,
      }

      const hours: Hours[] = []

      if (this.loaded) {
        this.surveys.forEach(survey => {
          hours.push(JSON.parse(
            JSON.stringify(survey.hours)
          ))
        });
      }

      // TOTAL HOURS
      for (const key in hours) {
        if (Object.prototype.hasOwnProperty.call(hours, key)) {
          const element = hours[key];

          this.socialMedias.forEach(socialMedia => {
            let label: string;

            label = socialMedia.label.toLowerCase()
            hoursData[`${label as keyof Hours}Time`] += Number(element[`${label as keyof Hours}`])
          });
          // hoursData['facebookTime'] += Number(element.facebook)
          // hoursData['instagramTime'] += Number(element.instagram)
          // hoursData['tiktokTime'] += Number(element.tiktok)
          // hoursData['twitterTime'] += Number(element.twitter)
          // hoursData['whatsappTime'] += Number(element.whatsapp)
          // hoursData['youtubeTime'] += Number(element.youtube)
        }
      }

      this.socialMedias.forEach(socialMedia => {
        const label: string = socialMedia.label.toLowerCase()
        const prom = (hoursData[`${label as keyof Hours}Time`] / this.getTotal).toFixed(1)
        hoursData[`${label as keyof Hours}Prom`] = Number(prom)
        // console.debug(prom)
      })
      // console.debug(this.getSurveysByFav)

      //?? "+" FORCE CONVERT TO NUMBER

      return hoursData
    },
    getRanges() {
      let rangesData = {
        "range-aTotal": 0,
        "range-bTotal": 0,
        "range-cTotal": 0,
        "range-dTotal": 0,
        "range-a": {
          facebook: 0,
          instagram: 0,
          twitter: 0,
          tiktok: 0,
          youtube: 0,
          whatsapp: 0,
        },
        "range-b": {
          facebook: 0,
          instagram: 0,
          twitter: 0,
          tiktok: 0,
          youtube: 0,
          whatsapp: 0,
        },
        "range-c": {
          facebook: 0,
          instagram: 0,
          twitter: 0,
          tiktok: 0,
          youtube: 0,
          whatsapp: 0,
        },
        "range-d": {
          facebook: 0,
          instagram: 0,
          twitter: 0,
          tiktok: 0,
          youtube: 0,
          whatsapp: 0,
        },
      }
      for (const key in this.getSurveysByAge) {
        if (Object.prototype.hasOwnProperty.call(this.getSurveysByAge, key)) {
          const ages = this.getSurveysByAge[key];
          rangesData[`${key}Total`] = ages.length


          ages.forEach(survey => {
            rangesData[`${key}`]['facebook'] += survey['favSocialMedia'] == 'sm-fc' ? 1 : 0;
            rangesData[`${key}`]['instagram'] += survey['favSocialMedia'] == 'sm-in' ? 1 : 0;
            rangesData[`${key}`]['youtube'] += survey['favSocialMedia'] == 'sm-yt' ? 1 : 0;
            rangesData[`${key}`]['whatsapp'] += survey['favSocialMedia'] == 'sm-ws' ? 1 : 0;
            rangesData[`${key}`]['tiktok'] += survey['favSocialMedia'] == 'sm-tk' ? 1 : 0;
            rangesData[`${key}`]['twitter'] += survey['favSocialMedia'] == 'sm-tw' ? 1 : 0;
          });
        }
      }
      return rangesData
    }

    //TODO: EXPERIMENTAL
    // getHours(): any {
    //   let socialMediaData = {
    //     facebookTime: 0,
    //     instagramTime: 0,
    //     tiktokTime: 0,
    //     twitterTime: 0,
    //     whatsappTime: 0,
    //     youtubeTime: 0,
    //     // favorites
    //     facebookVotes: 0,
    //     instagramVotes: 0,
    //     tiktokVotes: 0,
    //     twitterVotes: 0,
    //     whatsappVotes: 0,
    //     youtubeVotes: 0,
    //   }
    //   const hours: Hours[] = []

    //   // TOTAL HOURS
    //   if (this.loaded) {
    //     this.surveys.forEach(survey => {
    //       hours.push(JSON.parse(
    //         JSON.stringify(survey.hours)
    //       ))
    //     });

    //   }

    //   //TOTAL VOTES
    //   for (const key in hours) {
    //     if (Object.prototype.hasOwnProperty.call(hours, key)) {
    //       const element = hours[key];
    //       socialMediaData.facebookTime += Number(element.facebook)
    //       socialMediaData.instagramTime += Number(element.instagram)
    //       socialMediaData.tiktokTime += Number(element.tiktok)
    //       socialMediaData.twitterTime += Number(element.twitter)
    //       socialMediaData.whatsappTime += Number(element.whatsapp)
    //       socialMediaData.youtubeTime += Number(element.youtube)

    //       this.socialMedias.find(socialMedia => {
    //         if (socialMedia._id === this.surveys[key].favSocialMedia) {
    //           let smVoteKey = socialMedia.label.toLowerCase() + 'Votes'
    //           socialMediaData[smVoteKey] += 1
    //         }
    //       })
    //     }
    //   }

    //   // Most Popular
    //   var min = Infinity, max = -Infinity, x;
    //   for (x in input) {
    //     if (input[x] < min) min = input[x];
    //     if (input[x] > max) max = input[x];
    //   }
    //   const lessPopular = ''

    //   return socialMediaData
    // },


  },
  actions: {
    // increment(payload: number) {
    //   this.step = this.step + payload
    // },
    async getSurveysData() {
      const response = await fetch(
        "https://emqusurvey-bd-default-rtdb.firebaseio.com/surveys.json"
      );
      if (!response.ok) {
        throw new Error("Error al obtener las encuestas");
      }
      this.loaded = true
      const data = await response.json();

      //FB NOTATION TO ARRAY
      const loadedSurveys: Survey[] = []
      for (const key in data) {

        loadedSurveys.push(JSON.parse(
          JSON.stringify({
            id: key,
            email: data[key].email,
            ageRangeId: data[key].ageRangeId,
            genderId: data[key].genderId,
            favSocialMedia: data[key].favSocialMedia,
            hours: data[key].hours
          })
        ))
      }
      this.surveys = loadedSurveys
    }
  }
})

