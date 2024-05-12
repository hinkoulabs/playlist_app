require "test_helper"

class PlaylistsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get playlists_url
    assert_response :success
  end

  test "should new" do
    get new_playlist_url
    assert_response :success
  end

  context 'create' do
    should "create playlist if params are valid" do
      assert_difference("Playlist.count") do
        post playlists_url, params: { playlist: valid_params }
        assert_equal "Playlist was created", flash[:notice]
        playlist = Playlist.last
        assert_record_attributes(playlist, valid_params)
        assert_redirected_to playlist_url(playlist)
      end
    end

    should "return 422 if params are invalid" do
      assert_no_difference("Playlist.count") do
        post playlists_url, params: { playlist: invalid_params }
      end

      assert_response :unprocessable_entity
    end
  end

  test "should edit" do
    get edit_playlist_url(playlists(:first))
    assert_response :success
  end

  context 'update' do
    setup do
      @playlist = playlists(:first)
    end

    should "update playlist if params are valid" do
      assert_no_difference("Playlist.count") do
        patch playlist_url(@playlist), params: { playlist: valid_params }
      end

      assert_equal "Playlist was updated", flash[:notice]
      @playlist.reload
      assert_record_attributes(@playlist, valid_params)
      assert_redirected_to playlist_url(@playlist)
    end

    should "return 422 if params are invalid" do
      assert_no_difference("Playlist.count") do
        patch playlist_url(@playlist), params: { playlist: invalid_params }
      end

      assert_response :unprocessable_entity
    end
  end

  test "should delete playlist" do
    assert_difference("Playlist.count", -1) do
      delete playlist_url(playlists(:first))
    end

    assert_equal "Playlist was deleted", flash[:notice]
    assert_redirected_to playlists_url
  end

  context 'show' do
    setup do
      @playlist = playlists(:first)
    end

    should "get show.html" do
      get playlist_url(@playlist)
      assert_response :success
    end

    should "get playlist videos on show.json" do
      get playlist_url(@playlist), as: :json
      assert_response :success
      assert_equal(
        {
          "records" => [
            { "id" => 3, "title" => "EUPHORIA", "description" => "#Game Theory", "thumbnail_url" => "https://thumbnail_url.com/3.jpg", "view_count" => 43456 },
            { "id" => 5, "title" => "EUPHORIA", "description" => "#Game Theory", "thumbnail_url" => "https://thumbnail_url.com/3.jpg", "view_count" => 43456 },
            { "id" => 1, "title" => "thanks for 5 million", "description" => "#shorts", "thumbnail_url" => "https://thumbnail_url.com/1.jpg", "view_count" => 279357 }
          ],
          "meta" => {
            "total" => 3,
            "total_pages" => 1,
            "current_page" => 1,
            "per_page" => 20
          }
        },
        response.parsed_body
      )
    end

    should "get playlist videos with q 'ria' on show.json" do
      get playlist_url(@playlist), params: { q: 'ria' }, as: :json
      assert_response :success
      assert_equal(
        {
          "records" => [
            { "id" => 3, "title" => "EUPHORIA", "description" => "#Game Theory", "thumbnail_url" => "https://thumbnail_url.com/3.jpg", "view_count" => 43456 },
            { "id" => 5, "title" => "EUPHORIA", "description" => "#Game Theory", "thumbnail_url" => "https://thumbnail_url.com/3.jpg", "view_count" => 43456 },
          ],
          "meta" => {
            "total" => 2,
            "total_pages" => 1,
            "current_page" => 1,
            "per_page" => 20
          }
        },
        response.parsed_body
      )
    end

    should "get playlist videos with q 'an' on show.json" do
      get playlist_url(@playlist), params: { q: 'AN' }, as: :json
      assert_response :success
      assert_equal(
        {
          "records" => [
            { "id" => 1, "title" => "thanks for 5 million", "description" => "#shorts", "thumbnail_url" => "https://thumbnail_url.com/1.jpg", "view_count" => 279357 }
          ],
          "meta" => {
            "total" => 1,
            "total_pages" => 1,
            "current_page" => 1,
            "per_page" => 20
          }
        },
        response.parsed_body
      )
    end

    should "get playlist videos with q 'ria' and page 2 on show.json" do
      get playlist_url(@playlist), params: { q: 'ria', page: 2 }, as: :json
      assert_response :success
      assert_equal(
        {
          "records" => [],
          "meta" => {
            "total" => 2,
            "total_pages" => 1,
            "current_page" => 2,
            "per_page" => 20
          }
        },
        response.parsed_body
      )
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
