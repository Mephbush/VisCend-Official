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
      blocked_email_domains: {
        Row: {
          created_at: string
          domain: string
          id: string
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          preferred_language: string | null
          service_type: string | null
          status: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          preferred_language?: string | null
          service_type?: string | null
          status?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          preferred_language?: string | null
          service_type?: string | null
          status?: string | null
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: string
          created_at: string
          description_ar: string | null
          description_en: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          project_url: string | null
          service_type: string
          technologies: string[] | null
          title_ar: string | null
          title_en: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          project_url?: string | null
          service_type: string
          technologies?: string[] | null
          title_ar?: string | null
          title_en: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          project_url?: string | null
          service_type?: string
          technologies?: string[] | null
          title_ar?: string | null
          title_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_visits: {
        Row: {
          browser: string | null
          browser_version: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: string | null
          ended_at: string | null
          id: string
          ip_address: string | null
          is_returning_visitor: boolean | null
          language: string | null
          operating_system: string | null
          page_path: string
          page_title: string | null
          referrer: string | null
          screen_resolution: string | null
          session_id: string | null
          timezone: string | null
          user_agent: string | null
          visit_duration: number | null
        }
        Insert: {
          browser?: string | null
          browser_version?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          ended_at?: string | null
          id?: string
          ip_address?: string | null
          is_returning_visitor?: boolean | null
          language?: string | null
          operating_system?: string | null
          page_path: string
          page_title?: string | null
          referrer?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          timezone?: string | null
          user_agent?: string | null
          visit_duration?: number | null
        }
        Update: {
          browser?: string | null
          browser_version?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          ended_at?: string | null
          id?: string
          ip_address?: string | null
          is_returning_visitor?: boolean | null
          language?: string | null
          operating_system?: string | null
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          timezone?: string | null
          user_agent?: string | null
          visit_duration?: number | null
        }
        Relationships: []
      }
      visitors_site: {
        Row: {}
        Insert: {}
        Update: {}
        Relationships: []
      }
      website_visits: {
        Row: {
          bounce_rate: boolean | null
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
          page_title: string | null
          platform: string | null
          postal: string | null
          referrer: string | null
          region: string | null
          screen_color_depth: number | null
          screen_height: number | null
          screen_width: number | null
          session_id: string | null
          timezone: string | null
          updated_at: string
          user_agent: string | null
          viewport_height: number | null
          viewport_width: number | null
          visit_duration: number | null
          visitor_ip: string | null
        }
        Insert: {
          bounce_rate?: boolean | null
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
          page_title?: string | null
          platform?: string | null
          postal?: string | null
          referrer?: string | null
          region?: string | null
          screen_color_depth?: number | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string | null
          timezone?: string | null
          updated_at?: string
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
          visit_duration?: number | null
          visitor_ip?: string | null
        }
        Update: {
          bounce_rate?: boolean | null
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
          page_title?: string | null
          platform?: string | null
          postal?: string | null
          referrer?: string | null
          region?: string | null
          screen_color_depth?: number | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string | null
          timezone?: string | null
          updated_at?: string
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
          visit_duration?: number | null
          visitor_ip?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      site_analytics: {
        Row: {
          avg_duration: number | null
          new_visitors: number | null
          page_path: string | null
          returning_visitors: number | null
          total_visits: number | null
          unique_sessions: number | null
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
