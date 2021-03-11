<template>
    <div>
    <b-modal :id='"my-modal"+"(" + modalId +")"' ref="my-modal" hide-footer :title='modalTitle'>
        <div class="d-block text-center">
            <slot name="bodyModal"></slot>
        </div>
        <div class="d-flex justify-content-between align-self-center pl-1 pr-1">
            <b-button type="submit" variant="warning" @click="hideModal">Conserver</b-button>
            <slot name="button"></slot>
        </div>
    </b-modal>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        modalId:{
            type: Number
        },
        modalTitle: {
            type: String
        },
        modalEvent: {
            type: String
        }
    },
    methods:{
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        toggleModal() {
            // We pass the ID of the button that we want to return focus to
            // when the modal has hidden
            this.$refs['my-modal'].toggle('#toggle-btn')
        },
    }
}
</script>