<template>
  <q-banner inline-actions rounded class="text-white q-card--bordered bg-primary" >
      <q-btn to="/" flat icon="arrow_back" color="white" />
       <span class="text-subtitle1">Güncel Rezervasyonlar</span>
  </q-banner>

  <div class="q-pa-xs">
    <q-table
      :rows="getCurrentReservations"
      :columns="columns"
      row-key="id"
      class="shadow-1"
      :filter="filterReservation"
      :expanded="expanded"

    >
      <template v-slot:top>
        <q-input
          class="full-width"
          :input-style="{minWidth:'100%'}"
          dense
          outlined placeholder="Arama yapınız..."  v-model="filterReservation"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">

        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="blue-grey-8"  round dense :icon="props.expand ? 'remove' : 'add'" @click="toggleExpanded(props.row.id)" />
          </q-td>
          <q-td>
            {{props.row.CustomerNameSurname}}
          </q-td>
          <q-td>
            {{props.row.CustomerPhone}}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">

          <q-td   colspan="100%" style="padding-left: 0!important; padding-top: 0!important;">
            <div class="bg-grey-2 q-card--bordered q-pa-xs text-subtitle2"> Araç Bilgileri: {{ props.row.BrandName }} {{props.row.ModelName}} {{props.row.Year}} ({{props.row.LicencePlate}})</div>
            <div class="bg-grey-2 q-card--bordered q-pa-xs text-subtitle2">  Telefon:  {{ props.row.CustomerPhone }} </div>
            <div class="bg-grey-2 q-card--bordered q-pa-xs text-subtitle2"> Rezervasyon No:  #{{ props.row.id }} </div>
            <div class="bg-grey-2 q-card--bordered q-pa-xs text-subtitle2"> Rezervasyon Başlama Tarihi:  {{ props.row.StartDateTime }} </div>
            <div class="bg-grey-2 q-card--bordered q-pa-xs text-subtitle2"> Rezervasyon Bitiş Tarihi:  {{props.row.EndDateTime}} </div>
            <div class="q-mt-xs">
              <div class="text-subtitle2 bg-primary text-white q-pl-xs "  >Önceki</div>
              <div class="row bg-grey-4 q-pa-sm q-card--bordered"  >
                <div class="col-md-3 col-sm-3 col-xs-3 cursor-pointer q-pa-xs ">
                  <input hidden multiple ref="fileInput" type="file" @change="onFileChange($event)"  :key="props.row.id" :name="props.row.id"/>
                  <div class="q-pa-sm col text-center bg-white " >
                    <q-img src="https://img.favpng.com/22/0/8/computer-icons-icon-design-png-favpng-ixJX87JBXZmtYyTtN0ZYFcS7r.jpg" @click="choosePicture(props.row.id,'before')" :ratio="1" />
                  </div>
                </div>
                <div class="relative-position col-md-4 col-sm-4 col-xs-4 q-pa-xs"  v-for="(data,index) in JSON.parse(props.row.imagesBefore)" >
                  <q-img
                    spinner-color="red"
                    height="73px" @click="dialogImageShow(baseUrl()+data)"  :key="index" :src="baseUrl()+data">
                  </q-img>
                  <q-icon class="absolute-top-right text-right q-mb-md all-pointer-events " size="sm" name="close" color="white" style="border-radius: 5%" @click="removeFile(data,props.row.id)">
                  </q-icon>
                </div>
              </div>
            </div>
            <div class="q-mt-xs">
              <div class="text-subtitle2 bg-primary text-white q-pl-xs"  >Sonraki</div>
              <div class="row bg-grey-4 q-pa-sm q-card--bordered"  >
                <div class="col-md-3 col-sm-3 col-xs-3 cursor-pointer q-pa-xs ">
                  <input hidden multiple ref="fileInput" type="file" @change="onFileChange($event)"  :key="props.row.id" :name="props.row.id"/>
                  <div class="q-pa-sm col text-center bg-white " >
                    <q-img src="https://img.favpng.com/22/0/8/computer-icons-icon-design-png-favpng-ixJX87JBXZmtYyTtN0ZYFcS7r.jpg" @click="choosePicture(props.row.id,'after')" />
                  </div>
                </div>
                <div class="relative-position col-md-4 col-sm-4 col-xs-4 q-pa-xs"  v-for="(data,index) in JSON.parse(props.row.imagesAfter)" >
                  <q-img
                    spinner-color="red"
                    height="70px" @click="dialogImageShow(baseUrl()+data)"   :key="index" :src="baseUrl()+data">
                  </q-img>
                  <q-icon class="absolute-top-right text-right q-mb-md all-pointer-events " size="sm" name="close" color="white" style="border-radius: 5%" @click="removeFile(data,props.row.id)">
                  </q-icon>
                </div>
              </div>
            </div>
            <div class="q-mt-xs">
              <div class=" q-ml-xs text-subtitle2 text-bold ">Müşteri İmzası</div>
              <q-img  :src="customer_signature_preview"     :img-style="{maxHeight:'200px'}" fit="contain"/>
            </div>
            <div>
              <q-btn color="blue-8" label="Müşteri İmzası Al" @click="getCustomerSignature" icon="draw" class="q-mr-sm"  />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="imageDialog" >
           <q-img :src="imageShowSrc"/>
    </q-dialog>
    <q-dialog v-model="customerSignatureDialog" persistent>
      <q-card  >

        <q-card-section class="row items-center q-pa-sm">
          <q-avatar icon="draw" color="primary" text-color="white" size="md" />
          <span class="q-ml-sm">Müşteri Elektronik İmzası: {{customer_signature.length}}</span>
          <q-space />
          <q-btn icon="close"  flat round dense color="primary" v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-card--bordered q-pa-none"  v-show="customer_signature_preview.length === 0" >
          <vue-drawing-canvas
            ref="VueCanvasDrawing"
            width="300"
            height="200"
            color="blue"
            :lineWidth="3"
            saveAs="png"
            canvasId="customer_signature"
            v-model:image="customer_signature"
          />
        </q-card-section>
        <q-card-section class="row items-center q-card--bordered q-pa-none" v-show="customer_signature_preview.length > 0" style="width: 330px; height: 230px" >
          <div class="text-subtitle1   col-12 text-bold text-grey-8 text-center">Mevcut Islak İmzası</div>
          <q-img  :src="customer_signature_preview" width="300" height="300" style="border-top: 1px solid #eceaea; " />
        </q-card-section>

        <!--        v-close-popup-->
        <q-card-actions align="right">
          <q-btn   label="Sil" icon="delete_outline" color="primary" @click="clearSignature" />
          <q-btn   label="Onayla" color="blue-grey-8" icon="save"   @click="saveSignature()"   />

        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue"
import {baseUrl} from "boot/baseUrl";
import VueDrawingCanvas from 'vue-drawing-canvas';
const columns = [
  { name: 'CustomerNameSurname', align: 'center', label: 'Ad & Soyad', field: 'CustomerNameSurname', sortable: true },
  { name: 'CustomerPhone', align: 'center', label: 'Telefon', field: 'CustomerPhone', sortable: true },
  { name: 'LicencePlate', align: 'center', label: '', field: 'LicencePlate', sortable: true },
  // { name: 'id', align: 'center', label: 'Rezervasyon No', field: 'id', sortable: true },
]

export default {
  name: "Index",
  setup(){
     return {
       columns,

       imageData : ref([]),
       imageDialog : ref(false),
       imageShowSrc : ref(''),
       selectedRowId : ref(''),
       beforeAfterImageType : ref(''),
       baseUrl,
       filterReservation: ref(''),
       expanded: ref([]),
       customerSignatureDialog: ref(false),
       customer_signature : ref(''),
       customer_signature_preview : ref(''),
     }
  },
  mounted() {
    this.$store.dispatch('ReservationModule/get')
  },
  computed: {
    getCurrentReservations(){
      return this.$store.getters['ReservationModule/carReservationsGetter']
    }
  },
  methods : {
    createImageUrl(image) {
      return URL.createObjectURL(image)
    },
    onFileChange(event){
        const files = event.target.files;
      if(!files.length)
      {
        return false;
      }
      this.createImage(files)
    },
    createImage(files){

      let stack  = []

     for (let i=0; i<files.length; i++)
      {
        let formData = new FormData()
        formData.append('reservation_id',this.selectedRowId)
        formData.append('type',this.beforeAfterImageType)
        formData.append('image',files[i])
        formData.append('CustomerSignature',this.selectedRowId)
        // formData.append('_method','PUT')
        this.$store.dispatch('ReservationModule/update',formData).then( res => {
          console.log(res)
        })
      }

    },
    removeFile(data,id){
      let formData = new FormData()
      formData.append('reservation_id',id)
      formData.append('image',data)
    this.$store.dispatch('ReservationModule/destroyImage',formData).then( res => {
      console.log(res);
    })
    },
    choosePicture(id,str){
      this.beforeAfterImageType =str
      this.selectedRowId = id
      this.$refs.fileInput.click();
      console.log(this.beforeAfterImageType)
    },
    dialogImageShow(image)
    {
      this.imageShowSrc = image
      this.imageDialog = true
    },
    toggleExpanded(val){
      this.expanded = this.expanded[0] === val ? [] : [val]
    },
    getCustomerSignature() {
      this.customerSignatureDialog = true
    },
    saveSignature(){
      this.customer_signature_preview = (this.customer_signature.length > 2106 ) ? this.customer_signature : this.customer_signature_preview
      this.customerSignatureDialog = false
    },
    clearSignature() {
      this.customer_signature = ''
      this.customer_signature_preview = ''
      // this.$refs.VueCanvasDrawing.reset()
      //  console.log(this.$refs.VueCanvasDrawing.isEmpty())
    },
  },
  components : {
    VueDrawingCanvas
  }
}
</script>

<style scoped>

</style>
