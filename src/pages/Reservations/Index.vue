<template>
 <q-banner inline-actions class="text-white bg-primary q-pt-lg platform-ios-only" >
  </q-banner>
  <q-banner inline-actions class="text-white bg-primary q-pt-sm" >
      <q-btn to="/" flat icon="arrow_back" color="white" />
       <span class="text-subtitle1">Güncel Rezervasyonlar </span>
  </q-banner>
  <div class="q-pa-xs    ">
    <q-table
      :rows="getCurrentReservations"
      :columns="columns"
      row-key="id"
      class="shadow-1 no-box-shadow"
      :filter="filterReservation"
      :expanded="expanded"
      v-model:pagination="pagination"
      rows-per-page-label="Sayfa "
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
            <div class="bg-grey-2 q-card--bordered q-pa-xs text-subtitle2"> Rezervasyon No:  #{{ props.row.ReservationNo }} </div>
            <div class="bg-grey-2 q-card--bordered q-pa-xs text-subtitle2"> Rezervasyon Başlama Tarihi:  {{ props.row.StartDateTime }} </div>
            <div class="bg-grey-2 q-card--bordered q-pa-xs text-subtitle2"> Rezervasyon Bitiş Tarihi:  {{props.row.EndDateTime}} </div>


            <div class="q-mt-xs">
              <div class="text-subtitle2 bg-primary text-white q-pl-xs "  >Önceki</div>
              <div class="row bg-grey-4 q-pa-sm q-card--bordered"  >
                <div class="col-md-3 col-sm-3 col-xs-3 cursor-pointer q-pa-xs ">
                  <input hidden multiple ref="fileInput" type="file" @change="onFileChange($event)"  :key="props.row.id" :name="props.row.id"/>
                  <div class="q-pa-sm col text-center bg-white " >
                    <q-img src="https://img.favpng.com/22/0/8/computer-icons-icon-design-png-favpng-ixJX87JBXZmtYyTtN0ZYFcS7r.jpg" @click="choosePicture(props.row.id,'before')"  />
                  </div>
                </div>
                <div class="relative-position col-md-4 col-sm-4 col-xs-4 q-pa-xs"  v-for="(data,index) in JSON.parse(props.row.imagesBefore)" >
                  <q-img
                    spinner-color="red"
                    @click="dialogImageShow(baseUrl()+data)"
                    :key="index"
                    :src="baseUrl()+data"
                  style="min-height: 86px !important;"
                  >
                  </q-img>
                  <q-icon class="absolute-top-right text-right q-mb-md all-pointer-events" size="sm" name="close" color="white" style="border-radius: 5%" @click="removeFile(data,props.row.id)">
                  </q-icon>
                </div>
              </div>
            </div>
            <div class="q-mt-xs">
              <div class="text-subtitle2 bg-primary text-white q-pl-xs"  >Sonraki</div>
              <div class="row bg-grey-4 q-pa-sm q-card--bordered"  >
                <div class="col-md-3 col-sm-3 col-xs-3 cursor-pointer q-pa-xs ">
                  <input hidden multiple ref="fileInput" type="file" @change="onFileChange($event)"  :key="props.row.id" :name="props.row.id" accept="image/jpeg"/>
                  <div class="q-pa-sm col text-center bg-white " >
                    <q-img src="https://img.favpng.com/22/0/8/computer-icons-icon-design-png-favpng-ixJX87JBXZmtYyTtN0ZYFcS7r.jpg" @click="choosePicture(props.row.id,'after')"  />
                  </div>
                </div>
                <div class="relative-position col-md-4 col-sm-4 col-xs-4 q-pa-xs"  v-for="(data,index) in JSON.parse(props.row.imagesAfter)" >
                  <q-img
                    spinner-color="red"
                    height="70px"
                    @click="dialogImageShow(baseUrl()+data)"
                    :key="index"
                    :src="baseUrl()+data"
                    style="min-height: 86px !important;"
                  >
                  </q-img>
                  <q-icon class="absolute-top-right text-right q-mb-md all-pointer-events " size="sm" name="close" color="white" style="border-radius: 5%" @click="removeFile(data,props.row.id)">
                  </q-icon>
                </div>
              </div>
            </div>
            <div class="q-mt-xs">
              <q-card class="no-box-shadow">
                <q-card-section class="q-pa-none">
                  <div class="text-subtitle2 bg-blue-grey-8 text-white q-pl-xs"  >Müşteri İmzası</div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                <div class="row">
                  <div class="col-12 text-center">
                    <img :src="props.row.CustomerSignature"   class="q-pa-xs">
                  </div>
                </div>
                  <q-btn
                    color="primary"
                    dense
                    no-caps @click="getCustomerSignature(props.row.id,'customer')" icon="draw"
                    class="absolute q-mr-sm"
                    style="bottom: 0; right: 12px; transform: translateY(-50%);"
                  />
                </q-card-section>
              </q-card>

            </div>
            <div class="q-mt-xs">
              <q-card class="no-box-shadow">
                <q-card-section class="q-pa-none">
                  <div class="text-subtitle2 bg-blue-grey-8 text-white q-pl-xs"  >Personel İmzası</div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                 <div class="row">
                   <div class="col-12 text-center">
                     <img  :src="props.row.PersonalSignature"    class="q-pa-xs">
                   </div>
                 </div>
                  <q-btn
                    color="primary"
                    dense

                    no-caps
                    @click="getCustomerSignature(props.row.id,'personnel')"
                    icon="draw"
                    class="absolute q-mr-sm"
                    style="bottom: 0; right: 12px; transform: translateY(-50%);"
                  />
                </q-card-section>
              </q-card>
              <div class="row    q-card--bordered"  >
               <div class="col-12 text-center">


               </div>


              </div>
            </div>
<!--            <div class="q-mt-xs q-pa-sm justify justify-center" style="border-bottom: 5px solid #f5f5f5" >-->
<!--              <div class=" q-ml-xs text-subtitle2 text-bold text-center" style="border-bottom: 2px solid #1a1a1a;width: 50%;margin-left: 80px">Müşteri İmzası</div>-->
<!--              <div><q-img  :src="props.row.CustomerSignature"   :img-style="{maxHeight:'200px'}" fit="contain"/></div>-->
<!--              <div class="text-center">-->
<!--                <q-btn color="blue-grey-9 q-mb-lg" dense label="Müşteri İmzası" no-caps @click="getCustomerSignature(props.row.id,'customer')" icon="draw" class="q-mr-sm"  />-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="q-mt-xs q-pa-sm" style="border-bottom: 5px solid #f5f5f5">-->
<!--              <div class=" q-ml-xs text-subtitle2 text-bold text-center" style="border-bottom: 2px solid #1a1a1a;width: 50%;margin-left: 80px">Personel İmzası</div>-->
<!--              <div><q-img  :src="props.row.PersonalSignature"   :img-style="{maxHeight:'200px'}" fit="contain"/></div>-->
<!--              <div class="text-center">-->
<!--                <q-btn color="blue-grey-9 q-mb-lg" dense label="Personel İmzası" no-caps @click="getCustomerSignature(props.row.id,'personnel')" icon="draw" class="q-mr-sm"  />-->
<!--              </div>-->
<!--            </div>-->
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="imageDialog" >

             <q-img :src="imageShowSrc" />

    </q-dialog>

    <q-dialog v-model="customerSignFields.customerSignatureDialog" persistent>
      <q-card  >

        <q-card-section class="row items-center q-pa-sm">
          <q-avatar icon="draw" color="primary" text-color="white" size="md" />
          <span class="q-ml-sm">Müşteri Elektronik İmzası: {{customerSignFields.customer_signature.length}}</span>
          <q-space />
          <q-btn icon="close"  flat round dense color="primary" v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-card--bordered q-pa-none"   >
          <vue-drawing-canvas
            ref="VueCanvasDrawing"
            width="300"
            height="200"
            color="blue"
            :lineWidth="3"
            saveAs="png"
            canvasId="customer_signature"
            v-model:image="customerSignFields.customer_signature"
          />
        </q-card-section>

        <!--        v-close-popup-->
        <q-card-actions align="right">
          <q-btn   label="Sil" icon="delete_outline" color="primary" @click="clearSignature('customer')" />
          <q-btn   label="Onayla" color="blue-grey-8" icon="save"   @click="saveSignature('customer')"   />

        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="personnelSignFields.personnelSignatureDialog" persistent>
      <q-card  >

        <q-card-section class="row items-center q-pa-sm">
          <q-avatar icon="draw" color="primary" text-color="white" size="md" />
          <span class="q-ml-sm">Personel Elektronik İmzası: {{personnelSignFields.personnel_signature.length}}</span>
          <q-space />
          <q-btn icon="close"  flat round dense color="primary" v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-card--bordered q-pa-none"   >
          <vue-drawing-canvas
            ref="VueCanvasDrawing"
            width="300"
            height="200"
            color="blue"
            :lineWidth="3"
            saveAs="png"
            canvasId="customer_signature"
            v-model:image="personnelSignFields.personnel_signature"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn   label="Sil" icon="delete_outline" color="primary" @click="clearSignature('personnel')" />
          <q-btn   label="Onayla" color="blue-grey-8" icon="save"   @click="saveSignature('personnel')"   />

        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import {ref} from "vue"
import {baseUrl} from "boot/baseUrl";
import VueDrawingCanvas from 'vue-drawing-canvas';
import imageCompression from 'browser-image-compression';
import {Notify} from "quasar";
import axios from "axios";

const columns = [
  { name: 'CustomerNameSurname', align: 'center', label: 'Ad & Soyad', field: 'CustomerNameSurname', sortable: true },
  { name: 'CustomerPhone', align: 'center', label: 'Telefon', field: 'CustomerPhone', sortable: true },
  { name: 'LicencePlate', align: 'center', label: '', field: 'LicencePlate', sortable: true },]


export default {
  name: "Index",
  setup(){

     return {
       pagination: {
         rowsPerPage:10,
       },
       columns,
       imageData : ref([]),
       imageDialog : ref(false),
       imageShowSrc : ref(''),
       selectedRowId : ref(null),
       beforeAfterImageType : ref(''),
       baseUrl,
       filterReservation: ref(''),
       expanded: ref([]),
       personnelSignFields: ref({
         personnelSignatureDialog: false,
         personnel_signature : '',
         personnel_signature_preview : '',
       }),
       customerSignFields: ref({
         customerSignatureDialog: false,
         customer_signature : '',
         customer_signature_preview : '',
       }),


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
    onFileChange(event){
     const files = event.target.files;
      if(!files.length)
      {
        return false;
      }

      this.createImage(files)
    },
   async compressFiles(file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      return await imageCompression(file, options).then(function (compressedFile) {
       return compressedFile
     }).catch(function (error) {
         Notify.create({
           position: 'bottom-right',
           type: 'negative',
           message: error.message
         })
      })
    },
     async  createImage(files) {
         let formData = new FormData()
         formData.append('reservation_id', this.selectedRowId)
         formData.append('type', this.beforeAfterImageType)
         for (let i = 0; i < files.length; i++) {
           let file = await  this.compressFiles(files[i])
           formData.append('files[]',file)
       }
     await this.$store.dispatch('ReservationModule/uploadImage', formData)

       ///////////////////////////////////////////////////////////////////////


       // for (let i = 0; i < files.length; i++) {
       //   //     let file = URL.createObjectURL(files[i])
       //   // this.downscaleImage(files[i])
       //
       //   let formData = new FormData()
       //   formData.append('reservation_id', this.selectedRowId)
       //   formData.append('type', this.beforeAfterImageType)
       //   formData.append('image', files[i])
       //    this.$store.dispatch('ReservationModule/uploadImage', formData).then(res => {
       //     if (res) {
       //       Notify.create({
       //         position: 'top-right',
       //         type: 'positive',
       //         message: 'Dosya Başarıyla yüklendi'
       //       })
       //     }
       //   })
       // }


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
    getCustomerSignature(resId,type) {
      this.selectedRowId = resId
      if(type === 'customer')
      {
        this.customerSignFields.customerSignatureDialog = true
      } else
      {
        this.personnelSignFields.personnelSignatureDialog = true
      }

    },
    saveSignature(type){
    if(type === 'customer')
    {
      let formData = new FormData()
      formData.append('CustomerSignature',this.customerSignFields.customer_signature)
      formData.append('PersonalSignature',null)
      formData.append('reservation_id',this.selectedRowId)
      formData.append('type','customer')
      this.$store.dispatch('ReservationModule/sendCustomerPersonalSignature',formData).then( res => {
        if(res === true)
        {
          this.customerSignFields.customerSignatureDialog = false
          this.clearSignature('customer')
        }
      })

    } else
    {
      let formData = new  FormData()
      formData.append('PersonalSignature',this.personnelSignFields.personnel_signature)
      formData.append('CustomerSignature',null)
      formData.append('reservation_id',this.selectedRowId)
      formData.append('type','personnel')
      this.$store.dispatch('ReservationModule/sendCustomerPersonalSignature',formData).then(res => {
        if(res === true)
        {
          this.personnelSignFields.personnelSignatureDialog = false
          this.clearSignature('personnel')
        }
      })
    }
    },
    clearSignature(type) {
      if(type === 'customer')
      {
        this.customerSignFields.customer_signature = ''
        this.customerSignFields.customer_signature_preview = ''
        this.$refs.VueCanvasDrawing.reset()
      } else
      {
         this.personnelSignFields.personnel_signature = ''
         this.personnelSignFields.personnel_signature_preview = ''
         this.$refs.VueCanvasDrawing.reset()
      }


    },
////////////////////////////////////////


  },
  components : {
    VueDrawingCanvas
  }
}
</script>

<style scoped>
.my-image {
width: 100%;
height: auto;
max-width: 100%;
max-height: 100%;
margin: auto; }
</style>
