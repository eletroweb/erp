import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"
import { ValidarCPF, ValidarCNPJ } from '@/common/util'

export const ClienteStore = defineStore('clienteStore', {
    state: () => ({
        clientes: [],
        cliente: {
            setor: {
                uuid: ""
            },
            nome: "",
            telefone: "",
            email: "",
            documento: "",
            situacao: "",
            endereco: {
                cep: null,
                endereco: null,
                cidade: null,
                estado: null,
                bairro: null,
                complemento: null,
                numero: null
            }
        },
        btnSalvarValido: true,
        pesquisa: {
            nome: null,
            documento: null,
            situacao: null
        }
    }),
    actions: {
        async listar() {
            try {
                const url = await this.getUrlListar();
                const response = await api.get(url);
                this.clientes = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
            return this.clientes
        },
        async getUrlListar() {
            const queryParams = {};
            if (this.pesquisa.nome !== null)
                queryParams.nome = this.pesquisa.nome;
    
            if (this.pesquisa.documento !== null)
                queryParams.documento = this.pesquisa.documento;

            if (this.pesquisa.situacao !== null)
                queryParams.situacao = this.pesquisa.situacao;    
    
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `clientes?${queryString}`;
            return url
        },
        async novo() {
            this.reset()
            router.push('/clientes/cadastrar-clientes');
        },
        async cadastrar() {
            const notificacaoStore = NotificacaoStore();
            if(this.cliente.telefone==null || this.cliente.telefone.length==0){
                notificacaoStore.exibirNotificacao("Atenção", "O telefone deve ser informado", 'warning');
                return
            }
            if(this.cliente.email==null || this.cliente.email.length==0){
                notificacaoStore.exibirNotificacao("Atenção", "O email deve ser informado", 'warning');
                return
            }
            if(this.cliente.setor==null || this.cliente.setor.uuid==0){
                notificacaoStore.exibirNotificacao("Atenção", "O setor deve ser informado", 'warning');
                return
            }
          
            const endereco = await this.findAddressCep(this.cliente.endereco.cep);
            this.cliente.estado = endereco.estado;
            this.cliente.cidade = endereco.cidade;
            this.cliente.endereco = endereco.logradouro;
            this.cliente.bairro = endereco.bairro;
        
            try {
                const request = this.requestBuild()
                const response = await api.post("clientes", request);
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Novo cliente", "Cliente cadastrado com sucesso", 'success');
                    this.reset()
                    router.push('/clientes');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar cliente:", error);
            }
        },

        async editar(id) {
            const notificacaoStore = NotificacaoStore();
            if (!id) {
                notificacaoStore.exibirNotificacao("Erro", "ID do cliente é inválido", 'error');
                return;
            }
            try {
                const request = this.requestBuild();
                const response = await api.put(`clientes/${id}`, request);
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Cliente", "Cliente atualizado com sucesso", 'success');
                    this.reset();
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao editar cliente:", error);
                notificacaoStore.exibirNotificacao("Erro", "Erro ao editar cliente", 'error');
            }
        },

        async cancelar() {
            router.push('/clientes');
        },
        async limparPesquisa() {
            this.pesquisa.nome = null
            this.pesquisa.documento = null
            this.pesquisa.situacao = null
            this.listar()
        },
        async filtrarPorSituacao(){
            this.listar()
        },
        async carregarCliente(id) {
            try {
                const response = await api.get(`clientes/${id}`);
                this.cliente = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(id) {
            this.carregarCliente(id)
            router.push(`/clientes/${id}`);
        },
        async excluir(id) {
            const notificacaoStore = NotificacaoStore();
            console.log("ID do cliente a ser excluído:", id);
            if (!id) {
                notificacaoStore.exibirNotificacao("Erro", "ID do cliente é inválido", 'error');
                return;
            }
            try {
                const response = await api.delete(`clientes/${id}`);
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Excluir de cliente", `Cliente excluído com sucesso`, 'success');
                    this.reset();
                    router.push('/clientes');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao excluir cliente:", error);
                notificacaoStore.exibirNotificacao("Erro", "Erro ao excluir cliente", 'error');
                throw error;
            }
        },
        handleDocumento() {
            try {
                const notificacaoStore = NotificacaoStore();
                const { documento } = this.cliente;
                const isValid = ValidarCPF(documento) || ValidarCNPJ(documento);
                if (!isValid) {
                    notificacaoStore.exibirNotificacao(isValid ? 'Sucesso' : 'Erro', 'CPF ou CNPJ inválido', 'warning');
                    this.btnSalvarValido = false
                    return
                } else {
                    this.btnSalvarValido = true
                }

                if (!this.cliente.uuid)
                    this.ValidarDocumentoExiste(documento)

                this.btnSalvarValido = true
            } catch (error) {
                console.log(error.message);
            }
        },
        async ValidarDocumentoExiste(documento) {
            try {
                const response = await api.get(`clientes/findByDocumento/${documento}`);
                const notificacaoStore = NotificacaoStore();
                if (response.data) {
                    notificacaoStore.exibirNotificacao('Erro', `Já existe um cliente cadastrado com o CPF/CNPJ ${documento}`, 'warning');
                    this.btnSalvarValido = false
                    return
                } 
            } catch (error) {
                console.log(error.message);
            }
        },
        requestBuild() {
            return {
                ...this.cliente,
                setor: this.cliente.setor.uuid,
            };
        },
        async validarEmail(){
            const response = await api.get(`clientes/findByEmail/${this.cliente.email}`)
            if (response.data.length > 0) {
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao('Atenção', response.data, 'warning');
                this.btnSalvarValido = false
                return
            }
        },
        async findAddressCep() {
            try {
                const response = await api.get(`/findAddressByCep/${this.cliente.endereco.cep}`);
                this.cliente.endereco = response.data;
            } catch (error) {
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao('Atenção', 'Erro ao buscar endereço por CEP:', 'warning');
                throw error;
            }
        },
        reset() {
            this.cliente = {
                setor: {
                    uuid: ""
                },
                cep: "",
                estado: "",
                cidade: "",
                endereco: "",
                bairro: "",
                nome: "",
                telefone: ""
            };
        }
    },
})