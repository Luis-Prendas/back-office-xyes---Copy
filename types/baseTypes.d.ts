

export type ResponseBase = {
  code?: string;
  data?: any;
  error?: any;
};


export interface ModalProps {
  type: keyof typeof Modals; // Se asegura de que `type` solo pueda ser una de las claves de `Modals`
  showModal: boolean;
  handleModal: (action: string, data: any) => void;
  user: any; // Cambia el tipo según lo que sea `userId`
}