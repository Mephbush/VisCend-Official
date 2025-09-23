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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          notes: string | null
          status: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          notes?: string | null
          status?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          notes?: string | null
          status?: string | null
        }
        Relationships: []
      }
      kv_store_e19fe9e0: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          client: string | null
          created_at: string
          description: string
          featured: boolean | null
          id: string
          image_url: string | null
          title: string
          updated_at: string
          video_url: string | null
          year: number | null
        }
        Insert: {
          category: string
          client?: string | null
          created_at?: string
          description: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
          year?: number | null
        }
        Update: {
          category?: string
          client?: string | null
          created_at?: string
          description?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
          year?: number | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          description: string | null
          from_user_id: string | null
          id: string
          reference_id: string | null
          status: string | null
          to_user_id: string | null
          transaction_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          description?: string | null
          from_user_id?: string | null
          id?: string
          reference_id?: string | null
          status?: string | null
          to_user_id?: string | null
          transaction_type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          description?: string | null
          from_user_id?: string | null
          id?: string
          reference_id?: string | null
          status?: string | null
          to_user_id?: string | null
          transaction_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number | null
          created_at: string
          currency: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      website_visits: {
        Row: {
          browser: string | null
          browser_version: string | null
          city: string | null
          connection_speed: number | null
          connection_type: string | null
          cookie_enabled: boolean | null
          country: string | null
          created_at: string
          device_type: string | null
          do_not_track: string | null
          id: string
          isp: string | null
          language: string | null
          languages: string | null
          latitude: number | null
          longitude: number | null
          memory_limit: number | null
          memory_total: number | null
          memory_used: number | null
          online_status: boolean | null
          os: string | null
          os_version: string | null
          page_path: string
          platform: string | null
          postal: string | null
          referrer: string | null
          region: string | null
          screen_color_depth: number | null
          screen_height: number | null
          screen_width: number | null
          session_duration: number | null
          timezone: string | null
          updated_at: string
          user_agent: string | null
          viewport_height: number | null
          viewport_width: number | null
          visitor_ip: string | null
        }
        Insert: {
          browser?: string | null
          browser_version?: string | null
          city?: string | null
          connection_speed?: number | null
          connection_type?: string | null
          cookie_enabled?: boolean | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          do_not_track?: string | null
          id?: string
          isp?: string | null
          language?: string | null
          languages?: string | null
          latitude?: number | null
          longitude?: number | null
          memory_limit?: number | null
          memory_total?: number | null
          memory_used?: number | null
          online_status?: boolean | null
          os?: string | null
          os_version?: string | null
          page_path: string
          platform?: string | null
          postal?: string | null
          referrer?: string | null
          region?: string | null
          screen_color_depth?: number | null
          screen_height?: number | null
          screen_width?: number | null
          session_duration?: number | null
          timezone?: string | null
          updated_at?: string
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
          visitor_ip?: string | null
        }
        Update: {
          browser?: string | null
          browser_version?: string | null
          city?: string | null
          connection_speed?: number | null
          connection_type?: string | null
          cookie_enabled?: boolean | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          do_not_track?: string | null
          id?: string
          isp?: string | null
          language?: string | null
          languages?: string | null
          latitude?: number | null
          longitude?: number | null
          memory_limit?: number | null
          memory_total?: number | null
          memory_used?: number | null
          online_status?: boolean | null
          os?: string | null
          os_version?: string | null
          page_path?: string
          platform?: string | null
          postal?: string | null
          referrer?: string | null
          region?: string | null
          screen_color_depth?: number | null
          screen_height?: number | null
          screen_width?: number | null
          session_duration?: number | null
          timezone?: string | null
          updated_at?: string
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
          visitor_ip?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      visit_stats: {
        Row: {
          page_path: string | null
          total_visits: number | null
          unique_visitors: number | null
          visit_date: string | null
        }
        Relationships: []
      }
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
