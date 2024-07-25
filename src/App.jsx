import { Button, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const VITE_CONTRACT_URL = import .meta.env.VITE_CONTRACT_URL
const VITE_DOWNLOAD_URL = import .meta.env.VITE_DOWNLOAD_URL

function App() {
    // const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        contratante: "", empresa: "", cnpj: "", rua: "", numero: "", bairro: "", cidade: "",
        estado: "", cep: "", orcamento: "", vencimento: ""
    });

    // const handleUpload = ({ file }) => {
    //     setFile(file);
    // }

    // const submitUpload = async () => {
    //     if (!file) {
    //         toast.error('Por favor, envie um arquivo Excel primeiro');
    //         return;
    //     }

    //     const uploadData = new FormData();
    //     uploadData.append('file', file);

    //     try {
    //         const response = await axios.post('http://localhost:3000/upload', uploadData, {
    //             responseType: 'blob',
    //         });

    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'contratos.zip');
    //         document.body.appendChild(link);
    //         link.click();
    //         link.remove();
    //         toast.success('Contratos gerados com sucesso!');
    //     } catch (error) {
    //         toast.error('Erro ao gerar contratos');
    //     }
    // };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitContract = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${VITE_CONTRACT_URL}`, formData);
            console.log('Response data:', response.data);
            toast.success("Contrato gerado com sucesso!");

            const filename = response.data.filename;
            console.log(`Filename for download: ${filename}`);
            const url = `${VITE_DOWNLOAD_URL}?filename=${filename}`;
            console.log(`Download URL: ${url}`);
            window.location.href = url;
        } catch (error) {
            console.error('Error generating contract:', error);
            console.error('Error response data:', error.response?.data);
            toast.error(`Erro ao gerar contrato: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
        }
    };

    return (
        <main>
            <form onSubmit={submitContract} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '30%' }}>
                <div className="form-item-row">
                    <div className="item-column">
                        <label>Contratante</label>
                        <Input type="text" name="contratante" placeholder="Digite o nome do contratante" value={formData.contratante} onChange={handleChange} />
                    </div>
                    <div className="item-column">
                        <label>Empresa</label>
                        <Input type="text" name="empresa" placeholder="Digite o nome da empresa contratante" value={formData.empresa} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-item">
                    <label>CNPJ</label>
                    <Input type="text" name="cnpj" placeholder="Digite o CPF ou CNPJ do contratante" value={formData.cnpj} onChange={handleChange} /> 
                </div>
                <div className="form-item-row">
                    <div className="item-column">
                        <label>Rua</label>
                        <Input type="text" name="rua" placeholder="Digite a Rua da sede" value={formData.rua} onChange={handleChange} />
                    </div>
                    <div className="item-column">
                        <label>N°</label>
                        <Input type="text" name="numero" placeholder="Digite o N° da sede" value={formData.numero} onChange={handleChange} />
                    </div>
                    <div className="item-column">
                        <label>Bairro</label>
                        <Input type="text" name="bairro" placeholder="Digite o bairro da sede" value={formData.bairro} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-item-row">
                    <div className="item-column">
                        <label>Cidade</label>
                        <Input type="text" name="cidade" placeholder="Digite a cidade da sede" value={formData.cidade} onChange={handleChange} />
                    </div>
                    <div className="item-column">
                        <label>Estado</label>
                        <Input type="text" name="estado" placeholder="Digite o estado da sede" value={formData.estado} onChange={handleChange} />
                    </div>
                    <div className="item-column">
                        <label>CEP</label>
                        <Input type="text" name="cep" placeholder="Digite o CEP da sede" value={formData.cep} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-item">
                    <label htmlFor="">Orçamento</label>
                    <Input type="number" name="orcamento" placeholder="Digite o orçamento do contrato" value={formData.orcamento} onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="">Vencimento</label>
                    <Input type="number" name="vencimento" placeholder="Digite o dia para o vencimento do pagamento" value={formData.vencimento} onChange={handleChange} />
                </div>
                <Button type="primary" htmlType="submit">Gerar Contrato</Button>
            </form>

            {/* <div style={{ padding: 50 }}>
                <h1>Gerador de Contratos</h1>
                <Upload
                    beforeUpload={() => false}
                    onChange={handleUpload}
                    multiple={false}
                >
                    <Button icon={<UploadOutlined />}>Enviar arquivo Excel</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={submitUpload}
                    style={{ marginTop: 20 }}
                >
                    Gerar Contratos
                </Button>
            </div> */}

            <Toaster
                toastOptions={{ duration: 3000 }}
                position="top-right"
                reverseOrder={false}
                gutter={0}
            />
        </main>
    );
}

export default App;