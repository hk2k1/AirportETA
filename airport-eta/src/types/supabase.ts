export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics: {
        Row: {
          avg_wait_time: number | null
          created_at: string
          date: string
          hour: number
          id: string
          total_passengers: number | null
          total_taxis: number | null
        }
        Insert: {
          avg_wait_time?: number | null
          created_at?: string
          date: string
          hour: number
          id?: string
          total_passengers?: number | null
          total_taxis?: number | null
        }
        Update: {
          avg_wait_time?: number | null
          created_at?: string
          date?: string
          hour?: number
          id?: string
          total_passengers?: number | null
          total_taxis?: number | null
        }
        Relationships: []
      }
      passengers: {
        Row: {
          created_at: string
          id: string
          name: string | null
          phone_number: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          phone_number?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          phone_number?: string | null
        }
        Relationships: []
      }
      queue_entries: {
        Row: {
          entered_queue_at: string
          id: string
          left_queue_at: string | null
          passenger_id: string | null
          status: string
        }
        Insert: {
          entered_queue_at?: string
          id?: string
          left_queue_at?: string | null
          passenger_id?: string | null
          status: string
        }
        Update: {
          entered_queue_at?: string
          id?: string
          left_queue_at?: string | null
          passenger_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "queue_entries_passenger_id_fkey"
            columns: ["passenger_id"]
            isOneToOne: false
            referencedRelation: "passengers"
            referencedColumns: ["id"]
          },
        ]
      }
      rides: {
        Row: {
          created_at: string
          end_location: string | null
          end_time: string | null
          fare: number | null
          id: string
          passenger_id: string | null
          start_location: string | null
          start_time: string | null
          status: string
          taxi_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_location?: string | null
          end_time?: string | null
          fare?: number | null
          id?: string
          passenger_id?: string | null
          start_location?: string | null
          start_time?: string | null
          status: string
          taxi_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_location?: string | null
          end_time?: string | null
          fare?: number | null
          id?: string
          passenger_id?: string | null
          start_location?: string | null
          start_time?: string | null
          status?: string
          taxi_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rides_passenger_id_fkey"
            columns: ["passenger_id"]
            isOneToOne: false
            referencedRelation: "passengers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_taxi_id_fkey"
            columns: ["taxi_id"]
            isOneToOne: false
            referencedRelation: "taxis"
            referencedColumns: ["id"]
          },
        ]
      }
      taxi_locations: {
        Row: {
          id: string
          location: string
          taxi_id: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          location: string
          taxi_id?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          location?: string
          taxi_id?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "taxi_locations_taxi_id_fkey"
            columns: ["taxi_id"]
            isOneToOne: false
            referencedRelation: "taxis"
            referencedColumns: ["id"]
          },
        ]
      }
      taxis: {
        Row: {
          created_at: string
          driver_name: string
          id: string
          license_plate: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          driver_name: string
          id?: string
          license_plate: string
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          driver_name?: string
          id?: string
          license_plate?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
