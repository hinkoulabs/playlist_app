require 'test_helper'

class PageFetchJobTest < ActiveJob::TestCase
  test "skip fetch videos if fetch request is done" do
    fetch_request = fetch_requests(:active)

    fetch_request.status = 'done'
    assert_no_difference(["Video.count", "FetchRequest.count"]) do
      PageFetchJob.perform_now(fetch_request, Videos::Adapters::Default)
    end

    assert_no_enqueued_jobs

    assert fetch_request.done?
  end

  test "fetch videos from api with multiple pages if fetch request is processing" do
    fetch_request = fetch_requests(:active)

    stub_request(:get, fetch_request.data_source.url).with(query: { page: 1 }).to_return(body: file_fixture("response_multiple_pages.json"))

    assert_difference(
      -> { Video.count } => 2,
      -> { FetchRequest.where(data_source: fetch_request.data_source, page: 2).count } => 1,
      -> { FetchRequest.where(data_source: fetch_request.data_source, page: 3).count } => 1,
      -> { FetchRequest.where(data_source: fetch_request.data_source, page: 4).count } => 1,
      -> { FetchRequest.where(data_source: fetch_request.data_source, page: 5).count } => 1,
    ) do
      PageFetchJob.perform_now(fetch_request, Videos::Adapters::Default)
    end


    new_videos = fetch_request.data_source.videos.order(id: :asc).last(2)
    assert_record_attributes(new_videos[0], expected_video_attributes['21'])
    assert_record_attributes(new_videos[1], expected_video_attributes['22'])
    assert_record_attributes(Video.find(3), expected_video_attributes['20'])

    assert_enqueued_jobs 4

    assert fetch_request.done?
    assert_not_nil fetch_request.finished_at
  end

  test "fetch videos from api with single page if fetch request is processing" do
    fetch_request = fetch_requests(:active)

    stub_request(:get, fetch_request.data_source.url).with(query: { page: 1 }).to_return(body: file_fixture("response_single_page.json"))

    assert_difference("Video.count", 2) do
      PageFetchJob.perform_now(fetch_request, Videos::Adapters::Default)
    end

    assert_no_enqueued_jobs

    new_videos = fetch_request.data_source.videos.order(id: :asc).last(2)
    assert_record_attributes(new_videos[0], expected_video_attributes['21'])
    assert_record_attributes(new_videos[1], expected_video_attributes['22'])
    assert_record_attributes(Video.find(3), expected_video_attributes['20'])

    assert fetch_request.done?
    assert_not_nil fetch_request.finished_at
  end

  test "fetch videos from api with empty if fetch request is processing" do
    fetch_request = fetch_requests(:active)

    stub_request(:get, fetch_request.data_source.url).with(query: { page: 1 }).to_return(body: file_fixture("response_empty_page.json"))

    assert_no_difference(["Video.count", "FetchRequest.count"]) do
      PageFetchJob.perform_now(fetch_request, Videos::Adapters::Default)
    end

    assert_no_enqueued_jobs

    assert fetch_request.done?
    assert_not_nil fetch_request.finished_at
  end

  test "fetch videos from api with empty if fetch request is error" do
    fetch_request = fetch_requests(:active)

    fetch_request.status = 'error'

    stub_request(:get, fetch_request.data_source.url).with(query: { page: 1 }).to_return(body: file_fixture("response_empty_page.json"))

    assert_no_difference(["Video.count", "FetchRequest.count"]) do
      PageFetchJob.perform_now(fetch_request, Videos::Adapters::Default)
    end

    assert_no_enqueued_jobs

    assert fetch_request.done?
    assert_not_nil fetch_request.finished_at
  end

  protected

  def assert_next_process_page(request_attrs, expected_adapter)
    caller = -> (args) {
      fetch_request, adapter = args
      assert_equal adapter, expected_adapter
      assert_record_attributes(fetch_request, request_attrs)
    }
    assert_enqueued_with(job: PageFetchJob, args: caller)
  end

  def expected_video_attributes
    @expected_video_attributes ||= {
      '20' => {
        external_id: "20",
        title: "JoJo Siwa’s Freestyle – Dancing with the Stars",
        description: 'JoJo Siwa and Jenna Johnson dance Freestyle to “Born This Way” by Lady Gaga on the Dancing with the Stars Finale!Subscribe: http://goo.gl/T7bg3NWatch Dancing with the Stars Mondays at 8/7c on ABC and Stream on Hulu!',
        thumbnail_url: "https://i.ytimg.com/vi/XwRgg7g94wE/default.jpg",
        view_count: 691576,
        data_source_id: 1
      },
      '21' => {
        external_id: "21",
        title: "Minecraft, But It's Only 1 Water Block...",
        description: "Minecraft, But It's Only 1 Water Block...🚩 NEW CHANNEL! @Bionic Reacts 👀 FOLLOW ME PLSTikTok: @dannybionicTwitter: @dannybionicInstagram: @danny.bionicDiscord: https://discord.gg/bionicMy Editor: https://twitter.com/saflmaoIn todays Minecraft Challenge... Using only ONE custom water block, we have to survive by breaking 1 block! The twist is that we get custom modded items by breaking the block! Each block we break is random and gives us custom mobs, loot, and challenges! Can we survive with only ONE Water Block? Like and subscribe to help us get Trending #1!#minecraft #MinecraftBut #MinecraftChallenge",
        thumbnail_url: "https://i.ytimg.com/vi/yaaH64cQ6qs/default.jpg",
        view_count: 1544087,
        data_source_id: 1
      },
      '22' => {
        external_id: "22",
        title: "Riddle Impersonates Randy Orton To Defeat Dolph Ziggler | WWE Raw Highlights 11/22/21 | WWE on USA",
        description: "First Riddle is Randy Orton's Tag Team partner, but now he's dressing like Randy, using Randy's theme song, and using the RKO to win matches. RKBro has reached a new level that Dolph Ziggler just can't handle. WWE Raw Highlights 11/22/21. Watch WWE Raw Monday nights at 8/7c on USA Network. WWE now streaming on Peacock.   ►► SUBSCRIBE: https://usanet.tv/WWEonUSA-Sub►► WATCH FULL MATCHES NOW: https://usa.app.link/WatchWWE-Raw►► STREAM NOW ON PEACOCK: https://pck.tv/3s4aWyr ►► VISIT USA’S OFFICIAL SITE: http://usanet.tv/USA_Website #WWERaw #Highlight #RKBroAbout WWE Raw: WWE superstars invade your living room every Monday night as part of the longest-running episodic television program on cable TV. Watch new episodes of WWE Monday Night Raw Mondays at 8/7c on USA Network. WWE now streaming on Peacock.  About WWE on USA:USA Network has been the home of WWE programming for decades, featuring spectacular live television with WWE Raw and NXT 2.0. RK-Bro (Randy Orton and Riddle), Seth Rollins, Edge, Becky Lynch, Bianca Belair, and other superstars of professional wrestling square off in the ring and behind the scenes. The big muscles are matched by the oversized personalities and feuds. If it's WWE Raw, it must be Monday. The future of WWE has arrived and it's on WWE NXT 2.0! The next generation of WWE athletes—including Mandy Rose, Johnny Gargano, and Raquel González, and Tomasso Ciampa—are mentored by popular WWE superstars as they battle their way to fame. It’s ALL about the action.Get More WWE: Stream Now on Peacock: https://pck.tv/3s4aWyr Visit USA's Official Site: http://usanet.tv/USA_Website  Watch USA Full Episodes Here: https://usa.app.link/WatchUSALike USA on Facebook: http://usanet.tv/USA_Facebook   Follow USA on Twitter: http://usanet.tv/USA_Twitter   Follow USA on Instagram: http://usanet.tv/USA_Instagram",
        thumbnail_url: "https://i.ytimg.com/vi/Aq9WJUobbLs/default.jpg",
        view_count: 114308,
        data_source_id: 1
      }
    }
  end
end
