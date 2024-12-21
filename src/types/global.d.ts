interface UEInterface {
  getlouzuo: (building: any) => void;
  getchuanganqi: (msg: any) => void;
}

interface UE {
  interface: UEInterface;
  call: (method: string, params: any, callback: (rv: any) => void) => void;
}

declare global {
  interface Window {
    ue: UE;
  }
}

export {}; 