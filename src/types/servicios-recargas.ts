export interface ServiciosRecargas {
    CarrierControlNo: string
    ControlNo: string
    CustomerServiceNo: string
    H2H_RESULT_CODE: string
    InvoiceNo: string
    Pin: string
    ResponseCode: string
    ResponseMessage: string
    TransactionDateTime: string
    TransactionId: string
    Version: string
    accountId: string
    amount: string
    category: string
    comisionClient: number
    comisionProvider: number
    comisionTotal: number
    created_at: CreatedAt
    dagpacketService: string
    hostUser_id: string
    id: string
    isCodigoDigital: boolean
    lookUp: number
    name: string
    object_id: string
    originAplication: string
    originServer: string
    payment_date: PaymentDate
    payment_method: string
    payment_source: string
    productId: string
    providerAmount: number
    state: string
    status: string
    subcategory: string
    tipoContrato: string
    totalAmount: number
    type: string
    updated_at: UpdatedAt
    userId: string
    utilidad: number
    utilidadDag: number
    utilidadLicen: number
}

export interface CreatedAt {
    __time__: string
}

export interface PaymentDate {
    __time__: string
}

export interface UpdatedAt {
    __time__: string
}
