json.records @playlists do |playlist|
  json.extract! playlist, :id, :name
end
