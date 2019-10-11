            firebase.database().ref('meetups').push(meetup)
            .then((data) => {
                const key = data.key
                return key
            })
            .then((key) => {
                // *** For future updates, to change the naming format and destination folder ***
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
            })
            .then((fileData) => {
                imageUrl = fileData.metadata.downloadURLs[0]
                return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
            })
            .then(() => {
                commit('createMeetup', {
                    ...meetup,
                    imageUrl: imageUrl,
                    id: key
                })
            })
            .catch((error) => {
                console.log(error)
            })
            //Reach out to firebase and store it
            console.log(getters.user.id)
            console.log('Dispatched!')