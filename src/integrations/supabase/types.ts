export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      cibil_predictions: {
        Row: {
          created_at: string | null
          credit_utilization: number
          existing_loans: number
          factors: Json | null
          id: string
          income: number
          payment_history: string
          predicted_score: number
          recent_inquiries: number
          suggestions: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credit_utilization: number
          existing_loans: number
          factors?: Json | null
          id?: string
          income: number
          payment_history: string
          predicted_score: number
          recent_inquiries: number
          suggestions?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          credit_utilization?: number
          existing_loans?: number
          factors?: Json | null
          id?: string
          income?: number
          payment_history?: string
          predicted_score?: number
          recent_inquiries?: number
          suggestions?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          associated_loan_id: string | null
          category: string
          created_at: string | null
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          associated_loan_id?: string | null
          category: string
          created_at?: string | null
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          associated_loan_id?: string | null
          category?: string
          created_at?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_associated_loan_id_fkey"
            columns: ["associated_loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_quotes: {
        Row: {
          age: number
          annual_premium: number
          coverage_amount: number
          created_at: string | null
          gender: string
          id: string
          insurance_type: string
          monthly_premium: number
          occupation: string
          policy_term: number
          risk_factors: Json | null
          user_id: string
        }
        Insert: {
          age: number
          annual_premium: number
          coverage_amount: number
          created_at?: string | null
          gender: string
          id?: string
          insurance_type: string
          monthly_premium: number
          occupation: string
          policy_term: number
          risk_factors?: Json | null
          user_id: string
        }
        Update: {
          age?: number
          annual_premium?: number
          coverage_amount?: number
          created_at?: string | null
          gender?: string
          id?: string
          insurance_type?: string
          monthly_premium?: number
          occupation?: string
          policy_term?: number
          risk_factors?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      loans: {
        Row: {
          amount: number
          application_date: string
          created_at: string | null
          id: string
          interest_rate: number | null
          loan_type: string
          monthly_emi: number | null
          status: string
          tenure_months: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          application_date?: string
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          loan_type: string
          monthly_emi?: number | null
          status?: string
          tenure_months?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          application_date?: string
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          loan_type?: string
          monthly_emi?: number | null
          status?: string
          tenure_months?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          current_cibil_score: number | null
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          current_cibil_score?: number | null
          email: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          current_cibil_score?: number | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          category: string
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string
          id: string
          priority: string
          title: string
          user_id: string
        }
        Insert: {
          category: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date: string
          id?: string
          priority?: string
          title: string
          user_id: string
        }
        Update: {
          category?: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string
          id?: string
          priority?: string
          title?: string
          user_id?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
