import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const limit = 6;
const fetchNotes = async ({ userId, page, searchText }) => {
  console.log("searchText", searchText);
  try {
    // Execute both queries in parallel
    const [notesResponse, countResponse] = await Promise.all([
      supabase
        .from("notes")
        .select("*")
        .range(page * limit, page * limit + limit - 1)
        .ilike("title", `%${searchText}%`)
        .eq("userId", userId)
        .order("created_at", { ascending: false }),

      supabase
        .from("notes")
        .select("*", { count: "exact", head: true })
        .ilike("title", `%${searchText}%`)
        .eq("userId", userId)
        .order("created_at", { ascending: false }),
    ]);

    if (notesResponse.error || countResponse.error) {
      throw new Error(
        notesResponse.error?.message || countResponse.error?.message
      );
    }

    return {
      notes: notesResponse.data,
      count: Math.ceil(countResponse.count / limit) || 0,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

const useListNotes = ({ userId, page, searchText }) => {
  return useQuery({
    queryFn: () => fetchNotes({ userId, page, searchText }),
    queryKey: ["notesList", userId, page, searchText],
  });
};

export default useListNotes;
