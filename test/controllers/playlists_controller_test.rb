require "test_helper"

class PlaylistsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get playlists_url
    assert_response :success
  end

  test "should get new" do
    get new_playlist_url
    assert_response :success
  end

  context 'create' do
    should "should create playlist if params are valid" do
      assert_difference("Playlist.count") do
        post playlists_url, params: { playlist: valid_params }
        assert_equal "Playlist has been created", flash[:notice]
        playlist = Playlist.last
        assert_record_attributes(playlist, valid_params)
        assert_redirected_to playlist_url(playlist)
      end
    end

    should "should return 422 if params are invalid" do
      assert_no_difference("Playlist.count") do
        post playlists_url, params: { playlist: invalid_params }
        assert_response 422
      end
    end
  end

  test "should get edit" do
    get edit_playlist_url(playlists(:first))
    assert_response :success
  end

  context 'update' do
    setup do
      @playlist = playlists(:first)
    end

    should "should update playlist if params are valid" do
      assert_no_difference("Playlist.count") do
        put playlist_url(@playlist), params: { playlist: valid_params }
        assert_equal "Playlist has been updated", flash[:notice]
        @playlist.reload
        assert_record_attributes(@playlist, valid_params)
        assert_redirected_to playlist_url(@playlist)
      end
    end

    should "should return 422 if params are invalid" do
      assert_no_difference("Playlist.count") do
        put playlist_url(@playlist), params: { playlist: invalid_params }
        assert_response 422
      end
    end
  end

  test "should delete playlist" do
    assert_difference("Playlist.count", -1) do
      delete playlist_url(playlists(:first))
      assert_equal "Playlist has been deleted", flash[:notice]
      assert_redirected_to playlists_url
    end
  end

  protected

  def valid_params
    {
      name: "My New Playlist"
    }
  end

  def invalid_params
    {
      name: ""
    }
  end
end
