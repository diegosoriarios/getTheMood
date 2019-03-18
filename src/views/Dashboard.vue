<template>
    <div class="dashboard">
        <h1>Here's a summary of how users feel about your service in realtime</h1>
        <div>
            <template v-for="(emotion, index) in emotions">
                <div :key="index">
                    <strong>{{index}}</strong> clients: {{emotion}}
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data: function(){
        return {
            emotions: {
                angry: 0,
                neutral: 0,
                happy: 0
            },
            pusher_obj: null,
            e_channel: null,
        }
    },
    mounted: function(){
        this.init()
    },
    methods: {
        init(){
            this.pusher_obj = new Pusher("2039cbc5d42fb8ab7f73", {
                cluster: "us2",
                encrypted: true
            })

            this.e_channel = this.pusher_obj.subscribe("emotion_channel")
            let self = this
            this.e_channel.bind("new_emotion", function(data) {
                self.emotions[`${data.emotion}`] += 1
            })
        }
    }
}
</script>

<style>

</style>
