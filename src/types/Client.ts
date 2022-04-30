interface Contacts {
    note: string;
    createdAt: string;
}

export interface Client {
    _id: string;
    name?: String;
    identification?: number;
    phone?: number;
    address?: string;
    city?: string;
    email?: string;
    source?: string;
    contacts?: Contacts[];
    createdAt?: string;
}
