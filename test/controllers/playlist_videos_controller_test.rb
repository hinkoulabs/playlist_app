require "test_helper"

class PlaylistVideosControllerTest < ActionDispatch::IntegrationTest
  context 'create' do
    setup do
      @success_message = "New videos were successfully added"
    end

    should "return error request if params are missing" do
      assert_no_difference(["Playlist.count", "PlaylistVideo.count"]) do
        post playlist_videos_url, as: :json
      end

      assert_failure_response('New videos were not added (param is missing or the value is empty: playlist)')
    end

    context 'new playlist' do
      should "return error request if name of new playlist is empty" do
        assert_no_difference(["Playlist.count", "PlaylistVideo.count"]) do
          post playlist_videos_url, params: { playlist: { name: '' }, video_ids: [1, 2] }, as: :json
        end

        assert_failure_response(
          "New videos were not added (Validation failed: Name can't be blank)",
          { "name" => ["can't be blank"] }
        )
      end

      should "return error request if name of new playlist is not uniq" do
        assert_no_difference(["Playlist.count", "PlaylistVideo.count"]) do
          post playlist_videos_url, params: { playlist: { name: 'First' }, video_ids: [1, 2] }, as: :json
        end

        assert_failure_response(
          'New videos were not added (Validation failed: Name has already been taken)',
          { "name" => ["has already been taken"] }
        )
      end

      should "create a new playlist with videos where missing videos will be ignored" do
        assert_difference({"Playlist.count" => 1 , "PlaylistVideo.count" => 3}) do
          post playlist_videos_url, params: { playlist: { name: 'My New Playlist' }, video_ids: [2, 45, 1, 5, 10] }, as: :json
        end

        assert_record_attributes Playlist.last, { name: 'My New Playlist', video_ids: [2,1,5]  }

        assert_success_response(@success_message)
      end
    end

    context 'persisted playlist' do
      setup do
        @playlist = playlists(:first)
      end

      should "return error request if video_is are missing" do
        assert_no_difference(["Playlist.count", "PlaylistVideo.count"]) do
          post playlist_videos_url, params: { id: @playlist.id }, as: :json
        end

        assert_failure_response('New videos were not added (param is missing or the value is empty: video_ids)')
      end

      should "add missing videos to playlist" do
        assert_difference({"Playlist.count" => 0 , "PlaylistVideo.count" => 1}) do
          post playlist_videos_url, params: { id: @playlist.id, video_ids: [5,2] }, as: :json
        end

        @playlist.reload

        assert_record_attributes @playlist, { video_ids: [3, 5, 1, 2]  }

        assert_success_response(@success_message)
      end
    end
  end

  context 'destroy' do
    setup do
      @playlist = playlists(:first)
      @success_message = 'Videos were successfully deleted'
    end

    should "return error request if video_is are missing" do
      assert_no_difference(["Playlist.count", "PlaylistVideo.count"]) do
        delete playlist_video_url(@playlist), as: :json
      end

      assert_failure_response('New videos were not added (param is missing or the value is empty: video_ids)')
    end

    should "delete selected videos" do
      assert_difference({"Playlist.count" => 0 , "PlaylistVideo.count" => -2}) do
        delete playlist_video_url(@playlist), params: { video_ids: [3, 1, 10, 16] }, as: :json
      end

      @playlist.reload

      assert_record_attributes @playlist, { video_ids: [5]  }

      assert_success_response(@success_message)
    end
  end

  protected

  def assert_failure_response(error, playlist_error = nil)
    assert_response :unprocessable_entity

    expected_result = { "error" => error }

    if playlist_error
      expected_result["playlist"] = playlist_error
    end

    assert_equal(expected_result, response.parsed_body)
  end

  def assert_success_response(message)
    assert_response :success

    assert_equal(
      {
        "message" => message,
      },
      response.parsed_body
    )
  end
end