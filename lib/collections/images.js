import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const Images = new FilesCollection({
    storagePath: '/var/www/Meteor/Data/img/',
    URIBase: "/",
    collectionName: 'Images',
    allowClientCode: true, // Required to let you remove uploaded file,
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg|svg/i.test(file.ext)) {
            console.log("image accepted");
            return true;
        } else {
            console.log("image rejected");
            return 'Please upload image, with size equal or less than 10MB';
        }
    }
});

if (Meteor.isClient) {
    Meteor.subscribe('files.images.all');
}
