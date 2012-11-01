<ul>
	<li class="feed_item"
		ng-repeat="item in items"
		ng-class="{read: item.isRead}">
		<h2 class="item_date">
			<time class="timeago" datetime=""></time>
		</h2>
		
		<div class="utils">
			<ul class="primary_item_utils">
				<li ng-class="{important: item.isImportant}"
					class="star" 
					title="{{item.isImportant}}">
				</li>
			</ul>
		</div>

		<h1 class="item_title">
			<a target="_blank" href="{{item.url}}">{{item.title}}</a>
		</h1>

		<h2 class="item_author">from <a href="#" class="from_feed">{{item.title}}</a> by {{item.author}}</h2>

		<div class="body" ng-bind-html-unsafe="item.body"></div>

		<div class="bottom_utils">
			<ul class="secondary_item_utils">
				<li class="share_link">
					<a class="share" data-item-type="news_item" 
					   data-item="{{item.id}}" title="<?php p($l->t('Share')) ?>" 
					   data-possible-permissions="<?php p((OCP\Share::PERMISSION_READ | OCP\Share::PERMISSION_SHARE)) ?>" 
					   href="#">
					   <?php p($l->t('Share')) ?>
		  			</a>
		  		</li>
				<li class="keep_unread"><?php p($l->t('Keep unread')); ?><input type="checkbox" /></li>
			</ul>
		</div>
	</li>
</ul>


<!--echo '<h2 class="item_date"><time class="timeago" datetime="' .
			date('c', $item->getDate()) . '">' . date('F j, Y, g:i a', $item->getDate()) .  '</time>' . '</h2>';-->
















<?php
/*

$items = isset($_['items']) ? $_['items'] : '';
$lastViewedFeedType = isset($_['lastViewedFeedType']) ? $_['lastViewedFeedType'] : '';

echo '<ul>';
foreach($items as $item) {

	if($item->isRead()) {
		$newsItemClass = "read";
	} else {
		$newsItemClass = "";
	}

	if($item->isImportant()) {
		$starClass = 'important';
		$startTitle = $l->t('Mark as unimportant');
	} else {
		$starClass = '';
		$startTitle = ;
	}

	echo '<li class="feed_item ' . $newsItemClass .'" data-id="' . $item->getId() . '" data-feedid="' . $item->getFeedId() . '">';
		echo '<span class="timestamp">' . $item->getDate() . '</span>';
		echo '<h2 class="item_date"><time class="timeago" datetime="' .
			date('c', $item->getDate()) . '">' . date('F j, Y, g:i a', $item->getDate()) .  '</time>' . '</h2>';

		echo '<div class="utils">';
			echo '<ul class="primary_item_utils">';
				echo '<li class="star ' . $starClass . '" title="' . $startTitle . '"></li>';
			echo '</ul>';
		echo '</div>';

		echo '<h1 class="item_title"><a target="_blank" href="' . $item->getUrl() . '">' . htmlspecialchars($item->getTitle(), ENT_QUOTES, 'UTF-8') . '</a></h1>';

		if ((int)$lastViewedFeedType !== OCA\News\FeedType::FEED) {
			$feedTitle = $l->t('from') . ' ' . '<a href="#" class="from_feed"> ' . $item->getFeedTitle() . '</a> ';
		} else {
			$feedTitle = '';
		}
		
		if(($item->getAuthor() !== null) && (trim($item->getAuthor()) !== '')) {
			$author = $l->t('by') . ' ' . htmlspecialchars($item->getAuthor(), ENT_QUOTES, 'UTF-8');
		} else {
			$author = '';
		}

		if(!($feedTitle === '' && $author === '')){
			echo '<h2 class="item_author">'. $feedTitle . $author . '</h2>';
		}

		echo '<div class="body">' . $item->getBody() . '</div>';

		echo '<div class="bottom_utils">';
			echo '<ul class="secondary_item_utils">';
				echo '<li class="share_link"><a class="share" data-item-type="news_item" data-item="' . $item->getId() . '" title="' . $l->t('Share') . 
		      '" data-possible-permissions="' . (OCP\Share::PERMISSION_READ | OCP\Share::PERMISSION_SHARE) . '" href="#">' . $l->t('Share') . '</a></li>';				
				echo '<li class="keep_unread">' . $l->t('Keep unread') . '<input type="checkbox" /></li>';
			echo '</ul>';
		echo '</div>';
		

	echo '</li>';

	}
echo '</ul>';
*/
