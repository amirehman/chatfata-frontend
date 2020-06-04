import Vue from 'vue'
// Import Vue FilePond
import vueFilePond from 'vue-filepond';
// Import FilePond styles
// import 'filepond/dist/filepond.min.css';
// Import FilePond plugins
// Please note that you need to install these plugins separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const FilePond = vueFilePond(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
);

Vue.component(FilePond);