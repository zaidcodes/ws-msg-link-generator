var app = new Vue({
    el: '#app',
    data: {
        paises : [],
        pais : '0',
        numero : '',
        telefono : '',
        mensaje : '',
    },
    methods:{
        obtenerCodigos(){
            const f = fetch("/codigosTlf.json").then((result) => {
                return result.json()
            }).then((json) =>{
                this.paises = json;
            }).catch((err) => {
                return []
            });
            this.paises = f
        }
    },
    computed: {
        telefonoCompleto : function () {
            let cpais = this.pais == '0' ? '' : this.pais
            return cpais + this.numero
        },
        link : function () {
            return `https://api.whatsapp.com/send?phone=${this.telefonoCompleto}&text=${this.mensaje}`
        }
    },
    watch : {
        telefono : function (valor) {
            if(valor == ''){
                this.telefono = valor
                this.numero = valor;
            }else{
                const re = new RegExp('^[1-9][0-9]*');
                let result = valor.match(re)
                if(result == null){
                    this.telefono = this.numero
                }else{
                    result = result[0]
                    this.telefono = result
                    this.numero = result
                }
            }
        }
    },
    created: function () {
        this.obtenerCodigos()
    }
})