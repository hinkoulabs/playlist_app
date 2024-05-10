# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_09_145410) do
  create_table "data_sources", force: :cascade do |t|
    t.string "url"
    t.boolean "proxy"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["url"], name: "index_data_sources_on_url", unique: true
  end

  create_table "fetch_requests", force: :cascade do |t|
    t.integer "status", default: 0
    t.datetime "finished_at"
    t.string "url"
    t.text "log"
    t.integer "page"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "settings", force: :cascade do |t|
    t.string "var", null: false
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["var"], name: "index_settings_on_var", unique: true
  end

  create_table "videos", force: :cascade do |t|
    t.string "title"
    t.string "thumbnail_url"
    t.text "description"
    t.integer "view_count"
    t.string "external_id"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["external_id", "url"], name: "index_videos_on_external_id_and_url"
  end

end